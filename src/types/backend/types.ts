export interface ScraperOptions {
	searchValue: string
	maxRecords: number
}

export interface OffersProps {
	title: string;
	company: string;
	city: string;
	jobType: string;
	seniority: string;
	location: string;
	technologies: string[];
	description: string;
	employmentType: string;
	addedAt: string;
	salary: string;
	offerLink: string;
	image: string;
	salaryMin: string ;
	salaryMax: string;
}