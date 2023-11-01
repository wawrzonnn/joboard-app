import { ScraperOptions, JobOfferPracuj } from '../types/backend/types'
import { ScraperBase } from './scraperBase'
import { getTodayDate } from './utils'
export class ScraperJustJoinIT extends ScraperBase {
	options: ScraperOptions

	constructor(options: ScraperOptions) {
		super()
		this.options = options
	}

	async navigate(): Promise<void> {
		await this.sleep(500)
		if (!this.page) {
			throw new Error('Page has not been initialized. Please call initialize() first.')
		}
		const url = `https://justjoin.it/?keyword=${this.options.searchValue}&orderBy=DESC&sortBy=newest`

		try {
			await this.page.goto(url)
		} catch (error) {
			console.error('Error navigating to the page:', error)
			throw new Error('Failed to navigate to the page.')
		}
	}

	async getJobOffers(): Promise<JobOfferPracuj[]> {
		await this.sleep(500)
		if (!this.browser || !this.page) {
			throw new Error('Browser has not been initialized. Please call initialize() first.')
		}
		const jobOffersLiElements = await this.page.$$('[data-known-size="88"]')
		const offers: JobOfferPracuj[] = []
		for (let index = 0; index < 5; index++) {
			const offer = jobOffersLiElements[index]
			if (!offer) {
				break
			}
			const [title, company, image, offerLinkRaw, salary, salaryMinRaw, salaryMax, city] = await Promise.all([
				this.extractFromElement(offer, 'h2.css-16gpjqw'),
				this.extractFromElement(offer, 'div.css-fmb6qw span'),
				this.extractFromElement(offer, 'div.css-xlz5cy > img', 'src'),
				this.extractFromElement(offer, 'div.css-gpb9dg > a', 'href'),
				this.extractFromElement(offer, 'div.css-1qaewdq'),
				this.extractFromElement(offer, 'div.css-1qaewdq > span > span:nth-child(1)'),
				this.extractFromElement(offer, 'div.css-1qaewdq > span > span:nth-child(2)'),
				this.extractFromElement(offer, 'div.css-yo057c'),
			])
			const salaryMin = salaryMinRaw.replace(/\s+/g, '')
			const offerLink: string = `https://justjoin.it/${offerLinkRaw}`
			const addedAt: string = getTodayDate()
			let jobType: string = ''
			let seniority: string = ''
			let employmentType: string = ''
			let location: string = ''
			let description: string = ''
			let technologies: string[] = []

			try {
				await this.sleep(200)
				if (offerLink && this.browser) {
					const newPage = await this.browser.newPage()
					await newPage.goto(offerLink, { waitUntil: 'networkidle0' })

					jobType = await this.extractFromNewPage(newPage, 'div:nth-child(1).css-8n1acl div.css-15qbbm2')
					seniority = await this.extractFromNewPage(newPage, 'div:nth-child(2).css-8n1acl div.css-15qbbm2')
					employmentType = await this.extractFromNewPage(newPage, 'div:nth-child(3).css-8n1acl div.css-15qbbm2')
					location = await this.extractFromNewPage(newPage, 'div:nth-child(4).css-8n1acl div.css-15qbbm2')
					description = await this.extractFromNewPage(newPage, 'div.css-ncc6e2')

					const techElements = await newPage.$$('div.css-0 > h6')
					if (techElements.length > 0) {
						const techPromises = techElements.map(async techEl => {
							return newPage.evaluate((el: any) => el.textContent.trim(), techEl)
						})
						technologies = await Promise.all(techPromises)
					}

					await newPage.close()
				}
			} catch (error) {
				console.error('error:', error)
			}

			const jobOffer: JobOfferPracuj = {
				title,
				company,
				image,
				salary,
				salaryMin,
				salaryMax,
				city,
				offerLink,
				addedAt,
				jobType,
				seniority,
				employmentType,
				location,
				description,
				technologies,
			}

			offers.push(jobOffer)
		}

		return offers
	}
}
