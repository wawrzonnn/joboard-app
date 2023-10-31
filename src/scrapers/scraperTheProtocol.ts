import { ScraperOptions, JobOfferPracuj } from '../types/backend/types'
import { ScraperBase } from './scraperBase'
import {
	formatSalaryMaxNoFluffJobs,
	formatSalaryMinNoFluffJobs,
	removeStringAfterComma,
	formatSalaryMinTheProtocol,
	extractSeniorityLevelTheProtocol,
  extractDateTheProtocol,
} from './utils'

export class ScraperTheProtocol extends ScraperBase {
	options: ScraperOptions

	constructor(options: ScraperOptions) {
		super()
		this.options = options
	}

	async navigate(): Promise<void> {
		await this.sleep(1000)
		if (!this.page) {
			throw new Error('Page has not been initialized. Please call initialize() first.')
		}
		const url = `https://theprotocol.it/filtry/${this.options.searchValue};sp/1;s?sort=date`
		await this.page.goto(url)
		await this.sleep(1000)
		await this.page.click('[data-test="button-acceptAll"]')
	}

	async getJobOffers(): Promise<JobOfferPracuj[]> {
		await this.sleep(1000)
		if (!this.browser || !this.page) {
			throw new Error('Browser has not been initialized. Please call initialize() first.')
		}

		const jobOffersLiElements = await this.page.$$('a.anchorClass_a6of9et')
		const offers: JobOfferPracuj[] = []

		for (let index = 0; index < 5; index++) {
			await this.sleep(1000)
			const offer = jobOffersLiElements[index]
			if (!offer) {
				break
			}

			const [title, company, location, cityRaw, image, salary] = await Promise.all([
				this.extractFromElement(offer, 'h2'),
				this.extractFromElement(offer, 'div.labelsWrapper_l15lo1st > div:nth-child(1)'),
				this.extractFromElement(offer, 'div.labelsWrapper_l15lo1st > div:nth-child(2)'),
				this.extractFromElement(offer, 'div.labelsWrapper_l15lo1st > div:nth-child(3)'),
				this.extractFromElement(offer, '[data-test="icon-companyLogo"]', 'src'),
				this.extractFromElement(offer, 'div.textWrapper_t3j9udu'),
			])

			const city = removeStringAfterComma(cityRaw)
			const techElements = await this.extractTechStackFromOffer(offer, 'div.chipsWrapper_c3inpcj > div')
			const offerLink: string = await offer.getProperty('href').then(attr => attr.jsonValue())
			const salaryMax: string = formatSalaryMaxNoFluffJobs(salary)
			let salaryMinRaw: string = formatSalaryMinNoFluffJobs(salary)
			const salaryMin: string = formatSalaryMinTheProtocol(salaryMinRaw)

			let addedAt: string = 'No date'
			let jobType: string = ''
			let seniority: string = ''
			let employmentType: string = ''
			let description: string = ''
			let technologies: string[] = techElements

			try {
				await this.sleep(1000)
				if (offerLink && this.browser) {
					const newPage = await this.browser.newPage()
					await newPage.goto(offerLink, { waitUntil: 'networkidle0' })

					let seniorityRaw = await this.extractFromNewPage(newPage, 'div.Container_c1r78vy')
					seniority = extractSeniorityLevelTheProtocol(seniorityRaw)

					let addedAtRaw = await this.extractFromNewPage(newPage, 'div.Container_c1r78vy')
					addedAt = extractDateTheProtocol(addedAtRaw)

					description = await this.extractFromNewPage(newPage, 'div#TECHNOLOGY_AND_POSITION')
 
					employmentType = await this.extractFromNewPage(newPage, '[data-test="text-contractName"]')

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
