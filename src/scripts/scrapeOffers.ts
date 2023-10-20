import { ScraperBulldogJob } from '../scrapers/scraperBulldogJob'
// import { ScraperIndeed } from '../scrapers/scraperIndeed'
import { ScraperOptions } from '../scrapers/types'
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

		const bulldogScraper = new ScraperBulldogJob(options)
		await bulldogScraper.initialize()
		await bulldogScraper.navigate()
		const bulldogOffers = await bulldogScraper.getJobOffers()
		await bulldogScraper.close()

		offers.push(...bulldogOffers)
	}
	// const indeedScraper = new ScraperIndeed(options);
	// await indeedScraper.initialize();
	// await indeedScraper.navigate();
	// const indeedOffers = await indeedScraper.getJobOffers();
	// await indeedScraper.close();

	console.log(`Found ${offers.length} job offers:`)

	const offersToSaveJSON = offers.map(offer => ({
		title: offer.title,
		// description: offer.description,
		company: offer.company,
		// salaryFrom: offer.salaryFrom,
		// salaryTo: offer.salaryTo,
		// currency: offer.currency,
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
		image: offer.image
	}))

	const outputPath = path.join(__dirname, '../../public/results.json')
	fs.writeFileSync(outputPath, JSON.stringify(offersToSaveJSON, null, 2))

	// Log the saved offers to console
	console.log(offersToSaveJSON)
}
