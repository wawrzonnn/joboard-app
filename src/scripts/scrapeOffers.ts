import { ScraperBulldogJob } from '../scrapers/scraperBulldogJob'
import { ScraperPracuj } from '../scrapers/scraperPracuj'
import { ScraperOptions } from '../types/backend/types'
import { ScraperJustJoinIT } from '../scrapers/scraperJustJoinIT'
import { ScraperNoFluffJobs } from '../scrapers/scraperNoFluffJobs'
import fs from 'fs'
import path from 'path'

export const scrapeOffers = async (searchTerms: string[], limit: number = 5) => {
	console.log('Scrapping...')
	const offers = []

	for (const searchTerm of searchTerms) {
		const options: ScraperOptions = {
			searchValue: searchTerm,
			maxRecords: limit,
		}

		// const bulldogScraper = new ScraperBulldogJob(options)
		// await bulldogScraper.initialize()
		// await bulldogScraper.navigate()
		// const bulldogOffers = await bulldogScraper.getJobOffers()
		// await bulldogScraper.close()
		// offers.push(...bulldogOffers)

		// const pracujScraper = new ScraperPracuj(options)
		// await pracujScraper.initialize()
		// await pracujScraper.navigate()
		// const pracujOffers = await pracujScraper.getJobOffers()
		// await pracujScraper.close()
		// offers.push(...pracujOffers)

		// const justJointITScraper = new ScraperJustJoinIT(options)
		// await justJointITScraper.initialize()
		// await justJointITScraper.navigate()
		// const justJointITOffers = await justJointITScraper.getJobOffers()
		// await justJointITScraper.close()
		// offers.push(...justJointITOffers)

		const noFluffJobsScraper = new ScraperNoFluffJobs(options)
		await noFluffJobsScraper.initialize()
		await noFluffJobsScraper.navigate()
		const noFluffJobsOffers = await noFluffJobsScraper.getJobOffers()
		await noFluffJobsScraper.close()
		offers.push(...noFluffJobsOffers)

	}
	console.log(`Found ${offers.length} job offers:`)

	const offersToSaveJSON = offers.map(offer => ({
		title: offer.title,
		company: offer.company,
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

	const outputPath = path.join(__dirname, '../../public/results.json')
	fs.writeFileSync(outputPath, JSON.stringify(offersToSaveJSON, null, 2))

	// Log the saved offers to console
	console.log(offersToSaveJSON)
}
