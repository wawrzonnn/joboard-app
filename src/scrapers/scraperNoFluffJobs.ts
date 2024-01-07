import { ScraperOptions, OffersProps } from '../types/backend/types'
import { ScraperBase } from './scraperBase'
import { formatSalaryMaxNoFluffJobs, formatSalaryMinNoFluffJobs, filterContract, removeStringAfterComma, extractNoFluffAddedAtDate } from './utils'

export class ScraperNoFluffJobs extends ScraperBase {
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
		const url = `https://nofluffjobs.com/${this.options.searchValue}?page=1&sort=newest`
		await this.page.goto(url)
		await this.sleep(500)
		const button = await this.page.$('button#onetrust-accept-btn-handler')
		if (button) {
			await button.click()
		}
	}

	async getJobOffers(): Promise<OffersProps[]> {
		await this.sleep(500)
		if (!this.browser || !this.page) {
			throw new Error('Browser has not been initialized. Please call initialize() first.')
		}
		const jobOffersLiElements = await this.page.$$('a.posting-list-item')
		const offers: OffersProps[] = []
		for (let index = 0; index < 3; index++) {
			const offer = jobOffersLiElements[index]
			if (!offer) {
				break
			}
			const [title, company, image, salary] = await Promise.all([
				this.extractFromElement(offer, 'h3'),
				this.extractFromElement(offer, 'span.d-block'),
				this.extractFromElement(offer, 'div picture img', 'src'),
				this.extractFromElement(offer, 'span.text-truncate'),
			])

			const offerLinkRaw = await this.page.evaluate(el => el.getAttribute('href'), offer)

			let offerLink: string = `  https://nofluffjobs.com${offerLinkRaw}`
			let addedAt: string = 'No date'
			let jobType: string = ''
			let seniority: string = ''
			let employmentType: string = ''
			let location: string = ''
			let description: string = ''
			let technologies: string[] = []
			let salaryMin: string = formatSalaryMinNoFluffJobs(salary)
			let salaryMax: string = formatSalaryMaxNoFluffJobs(salary)
			let city: string = ''
			try {
				await this.sleep(200)
				if (offerLink && this.browser) {
					const newPage = await this.browser.newPage()
					await newPage.goto(offerLink, { waitUntil: 'networkidle0' })

					jobType = await this.extractFromNewPage(newPage, 'div:nth-child(1).css-8n1acl div.css-15qbbm2')
					seniority = await this.extractFromNewPage(newPage, 'span.mr-10')

					const locationRaw = await this.extractFromNewPage(newPage, 'span.locations-text > span')
					location = removeStringAfterComma(locationRaw)

					description = await this.extractFromNewPage(newPage, 'section#posting-description')

					const cityRaw = await this.extractFromNewPage(newPage, 'span.locations-text > span')
					city = removeStringAfterComma(cityRaw)

					const addedAtRaw = await this.extractFromNewPage(newPage, 'common-posting-time-info')
					addedAt = extractNoFluffAddedAtDate(addedAtRaw)
					

					const techElements = await newPage.$$('ul.mb-0 > li.tw-btn > span')
					if (techElements.length > 0) {
						const techPromises = techElements.map(async techEl => {
							return newPage.evaluate((el: any) => el.textContent.trim(), techEl)
						})
						technologies = await Promise.all(techPromises)
					}

					const employmentTypeElements = await newPage.$$('ul.ng-star-inserted > li.tw-inline-flex')
					const employmentTypesPromises = employmentTypeElements.map(async typeEl => {
						return newPage.evaluate((el: any) => el.textContent.trim(), typeEl)
					})
					const employmentTypes = await Promise.all(employmentTypesPromises)
					employmentType = filterContract(employmentTypes)

					await newPage.close()
				}
			} catch (error) {
				console.error('error:', error)
			}

			const jobOffer: OffersProps = {
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
