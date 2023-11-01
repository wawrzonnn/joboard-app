import { ScraperOptions, JobOfferBulldogJob } from '../types/backend/types'
import { ScraperBase } from './scraperBase'
import { ElementHandle } from 'puppeteer'
import {
	extractCityTheBulldogJob,
	extractDateTheBulldogJob,
	extractEmploymentTypeBulldogJob,
	extractSalaryMax,
	extractSalaryMin,
} from './utils'

export class ScraperBulldogJob extends ScraperBase {
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
		const url = `https://bulldogjob.pl/companies/jobs/s/role,${this.options.searchValue}/order,published,asc`
		await this.page.goto(url)
	}

	async extractLocation(offer: ElementHandle): Promise<string> {
		const locationText = await this.extractFromElement(offer, 'span.group.flex.rounded-md')
		return locationText || (await this.extractFromElement(offer, 'div span.text-xs')) || ''
	}

	async getJobOffers(): Promise<JobOfferBulldogJob[]> {
		await this.sleep(500)
		if (!this.browser || !this.page) {
			throw new Error('Browser has not been initialized. Please call initialize() first.')
		}

		const jobOffersLiElements = await this.page.$$('.container a.shadow-jobitem')
		const offers: JobOfferBulldogJob[] = []

		for (let index = 0; index < 5; index++) {
			const offer = jobOffersLiElements[index]
			if (!offer) {
				break
			}

			const [title, company, technologies, location, jobType, seniority, image] = await Promise.all([
				this.extractFromElement(offer, 'div > h3'),
				this.extractFromElement(offer, '.text-xxs'),
				this.extractTechStackFromOffer(offer, 'span.py-2'),
				this.extractLocation(offer),
				this.extractFromElement(offer, 'div.flex.items-start > span'),
				this.extractFromElement(offer, 'div.flex.items-start:nth-of-type(3) > span'),
				this.extractFromElement(offer, 'div > div > img', 'src'),
			])

			let addedAt = ''
			let employmentType = ''
			let salary = 'Ask'
			let salaryMin = ''
			let salaryMax = ''
			let description = ''
			let city = ''
			const offerLink: string = await offer.getProperty('href').then(attr => attr.jsonValue())

			try {
				await this.sleep(200)
				if (offerLink && this.browser) {
					const newPage = await this.browser.newPage()
					await newPage.goto(offerLink, { waitUntil: 'networkidle0' })

					employmentType = await extractEmploymentTypeBulldogJob(newPage)

					const dateElement = (await newPage.$x('//p[contains(@class, "text-md") and contains(text(), "2023")]'))[0]
					if (dateElement) {
						let addedAtRaw = await newPage.evaluate(p => (p.textContent ? p.textContent.trim() : ''), dateElement)
						addedAt = extractDateTheBulldogJob(addedAtRaw)
					}

					salary = await this.extractFromNewPage(newPage, 'div.jsx-651043755.mb-4 > p')
					salaryMin = extractSalaryMin(salary)
					salaryMax = extractSalaryMax(salary)

					description = await this.extractFromNewPage(newPage, 'div#accordionGroup')
					city = await extractCityTheBulldogJob(newPage)

					await newPage.close()
				}
			} catch (error) {
				console.error('Error during processing offer:', error)
			}

			offers.push({
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
			})
		}

		return offers
	}
}
