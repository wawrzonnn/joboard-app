export interface ScraperOptions {
	searchValue: string
	maxRecords: number
}

export interface JobOffer {
	title: string
	// description: string
	company: string
	// salaryFrom: string
	// salaryTo: string
	// currency: string
	offerLink: string;
	technologies: string[]
	location: string
	jobType: string
	seniority: string
	addedAt: string 
	employmentType: string
	salary: string
	description: string
	city: string
}
