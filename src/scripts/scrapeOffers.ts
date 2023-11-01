import { ScraperBulldogJob } from '../scrapers/scraperBulldogJob'
import { ScraperPracuj } from '../scrapers/scraperPracuj'
import { ScraperOptions } from '../types/backend/types'
import { ScraperJustJoinIT } from '../scrapers/scraperJustJoinIT'
import { ScraperNoFluffJobs } from '../scrapers/scraperNoFluffJobs'
import { ScraperTheProtocol } from '../scrapers/scraperTheProtocol'
import fs from 'fs'
import path from 'path'
import { maxLetters } from './utils'

export const scrapeOffers = async (searchTerms: string[], limit: number = 5) => {
	console.log('Scrapping...')

	const scrapers = [ScraperTheProtocol, ScraperJustJoinIT, ScraperPracuj, ScraperNoFluffJobs, ScraperBulldogJob]

	const allResults: { [key: string]: any[] } = {}

	for (const searchTerm of searchTerms) {
		const options: ScraperOptions = {
			searchValue: searchTerm,
			maxRecords: limit,
		}

		allResults[searchTerm] = []

		for (const Scraper of scrapers) {
			const scraperInstance = new Scraper(options)
			await scraperInstance.initialize()
			await scraperInstance.navigate()
			const scraperOffers = await scraperInstance.getJobOffers()
			await scraperInstance.close()

			allResults[searchTerm].push(
				...scraperOffers.map(offer => ({
					title: maxLetters(offer.title, 45),
					company: maxLetters(offer.company, 30),
					technologies: offer.technologies,
					addedAt: offer.addedAt,
					location: offer.location,
					jobType: offer.jobType,
					seniority: offer.seniority,
					employmentType: offer.employmentType,
					salary: offer.salary,
					salaryMin: offer.salaryMin,
					salaryMax: offer.salaryMax,
					description: offer.description,
					city: offer.city,
					offerLink: offer.offerLink,
					image: offer.image,
				}))
			)
		}
	}

	const outputPath = path.join(__dirname, '../../public/results.json')
	fs.writeFileSync(outputPath, JSON.stringify(allResults, null, 2))
	console.log(`Saved job offers to results.json`)
}
