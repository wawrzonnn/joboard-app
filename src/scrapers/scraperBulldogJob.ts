import { ScraperOptions, JobOffer } from './types'
import { ScraperBase } from './scraperBase'

export class ScraperBulldogJob extends ScraperBase {
	options: ScraperOptions

	constructor(options: ScraperOptions) {
		super()
		this.options = options
	}

	async navigate(): Promise<void> {
		if (!this.page) {
			throw new Error('Page has not been initialized. Please call initialize() first.')
		}
		const url = `https://bulldogjob.pl/companies/jobs/s/role,${this.options.searchValue}`
		try {
			await this.page.goto(url)
		} catch (error) {
			console.error('Error navigating to the page:', error)
			throw new Error('Failed to navigate to the page.')
		}
	}

	async parseSalary(salaryText: string): Promise<{ salaryFrom: string; salaryTo: string; currency: string }> {
		const regex = /(\d{1,3}(?:[\s]\d{3})*)(?:\s*-\s*)(\d{1,3}(?:[\s]\d{3})*)(?:\s*)([A-Z]+)/
		const match = salaryText.match(regex)

		if (match) {
			const salaryFrom = match[1].replace(/\s/g, '')
			const salaryTo = match[2].replace(/\s/g, '')
			const currency = match[3]

			return { salaryFrom, salaryTo, currency }
		}
		return { salaryFrom: 'unknown', salaryTo: 'unknown', currency: 'unknown' }
	}

	async getJobOffers(): Promise<JobOffer[]> {
		if (!this.page) {
			throw new Error('Page has not been initialized. Please call initialize() first.')
		}

		const jobOffersLiElements = await this.page.$$('.container a')
		const offers = await Promise.all(
			jobOffersLiElements.map(async offer => {
				const [salaryText, title, description, company, technologies, offerURL] = await Promise.all([
					this.extractFromElement(offer, '.text-dm div'),
					this.extractFromElement(offer, 'div > h3'),
					this.extractFromElement(offer, '.job-snippet'),
					this.extractFromElement(offer, '.text-xxs'),
					this.extractTechStackFromOffer(offer, 'span.py-2'),
					offer.evaluate(a => a.getAttribute('href')),
				])

				const { salaryFrom, salaryTo, currency } = await this.parseSalary(salaryText)

				let addedAt = ''
				try {
					if (!this.page) throw new Error('Page is null');
					// @ts-ignore
					await this.page.goto(offerURL, { waitUntil: 'networkidle0' as const });
					addedAt = await this.page.$eval('h1', h1 => h1.textContent ? h1.textContent.trim() : '');
				} catch (error) {
					console.error('error:', error)
				}
                

				return {
					title,
					description,
					company,
					salaryFrom,
					salaryTo,
					currency,
					offerURL,
					technologies,
					addedAt,
				}
			})
		)

		return offers.filter(offer => offer && offer.title).slice(0, this.options.maxRecords)
	}
}
