export interface ScraperOptions {
	searchValue: string
	maxRecords: number
}

export interface JobOffer {
	title: string
	description: string
	company: string
	salaryFrom: string
	salaryTo: string
	currency: string
	// offerURL: string | null;
	technologies: string[]
	addedAt: string

}
