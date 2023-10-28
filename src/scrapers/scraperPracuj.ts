import { ScraperOptions, JobOfferPracuj } from '../types/backend/types'
import { ScraperBase } from './scraperBase'

export class ScraperPracuj extends ScraperBase {
	options: ScraperOptions

	constructor(options: ScraperOptions) {
		super()
		this.options = options
	}

	async sleep(ms: number): Promise<void> {
		return new Promise(resolve => setTimeout(resolve, ms))
	}

	async navigate(): Promise<void> {
		await this.sleep(1000);
		if (!this.page) {
			throw new Error('Page has not been initialized. Please call initialize() first.');
		}
		const url = `https://www.pracuj.pl/praca/${this.options.searchValue};kw`;
		try {
			await this.page.goto(url);
			await this.sleep(1000); 
			await this.page.click('button.size-medium.variant-primary.cookies_b1fqykql');
		} catch (error) {
			console.error('Error navigating to the page:', error);
			throw new Error('Failed to navigate to the page.');
		}
	}


	async getJobOffers(): Promise<JobOfferPracuj[]> {
		await this.sleep(1000)
		if (!this.browser || !this.page) {
			throw new Error('Browser has not been initialized. Please call initialize() first.')
		}

		const jobOffersLiElements = await this.page.$$('[data-test="section-offers"] div div.listing_b1evff58')
		const offers: JobOfferPracuj[] = []
		for (let index = 0; index < 5; index++) {
			await this.sleep(1000)
			const offer = jobOffersLiElements[index]
			if (!offer) {
				break
			}
			const [title, company, location, jobType, seniority, image, addedAt, employmentType, offerLink, salary] = await Promise.all([
				this.extractFromElement(offer, 'h2 > a'),
				this.extractFromElement(offer, 'div > a > h4'),
				this.extractFromElement(offer, 'h5 > span:nth-child(2) > strong:nth-child(1)'),
				this.extractFromElement(offer, 'ul.listing_b1vay7bj > li:nth-last-of-type(1)'),
				this.extractFromElement(offer, 'ul.listing_b1vay7bj > li:nth-child(1)'),
				this.extractFromElement(offer, 'div.listing_cj2ui4y a img', 'src'),
				this.extractFromElement(offer, 'p.listing_b1nrtp6c.listing_pk4iags.size-caption.listing_t1rst47b'),
				this.extractFromElement(offer, 'ul.listing_b1vay7bj > li:nth-last-of-type(2)'),
				this.extractFromElement(offer, 'div.listing_c1dc6in8 > a', 'href'),
				this.extractFromElement(offer, 'div.listing_c7z99rl > span.listing_sug0jpb'),
			])

			let salaryMin: string = ''
			let salaryMax: string = ''
			let description: string = ''
			let city: string = ''
			let technologies: string[] = []

			try {
				await this.sleep(1000)
				if (offerLink && this.browser) {
					const newPage = await this.browser.newPage();
					await newPage.goto(offerLink, { waitUntil: 'networkidle0' });

					const descriptionElement = await newPage.$('div.offer-viewlvWH1V > p');
					if (descriptionElement) {
						description = await newPage.evaluate((el: any) => el.textContent.trim(), descriptionElement);
					}

					const cityElement = await newPage.$('div.offer-viewqtkGPu');
					if (cityElement) {
						city = await newPage.evaluate((el: any) => el.textContent.trim(), cityElement);
					}
					
					const techElements = await newPage.$$('li > p.offer-viewU0gxPf');
					if (techElements.length > 0) {
						const techPromises = techElements.map(async (techEl) => {
							return newPage.evaluate((el: any) => el.textContent.trim(), techEl);
						});
						technologies = await Promise.all(techPromises);
					}
					
					const salaryMinElement = await newPage.$('span.offer-viewZGJhIB');
					if (salaryMinElement) {
						salaryMin = await newPage.evaluate((el: any) => el.textContent.trim(), salaryMinElement);
					}

					const salaryMaxElement = await newPage.$('span.offer-viewYo2KTr');
					if (salaryMaxElement) {
						salaryMax = await newPage.evaluate((el: any) => el.textContent.trim(), salaryMaxElement);
					}


					await newPage.close()
				}
			} catch (error) {
				console.error('error:', error)
			}

			const jobOffer: JobOfferPracuj = {
				title,
				company,
				technologies,
				location,
				jobType,
				seniority,
				image,
				addedAt,
				employmentType,
				salary,
				description,
				city,
				offerLink,
				salaryMin,
				salaryMax,
			}

			offers.push(jobOffer)
		}

		return offers
	}
}
