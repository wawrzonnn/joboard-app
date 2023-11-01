import { ReactNode } from "react"

export enum JobType {
    FULL_TIME = 'Full-time',
    CONTRACT = 'Contract',
    PART_TIME = 'Part-time',
    FREELANCE = 'Freelance',
  }
  
  export enum Seniority {
    LEAD = 'Lead',
    EXPERT = 'Expert',
    SENIOR = 'Senior',
    MID_REGULAR = 'Mid/Regular',
    JUNIOR = 'Junior',
    INTERN = 'Intern',
  }
  
  export enum WorkLocation {
    REMOTE = 'Remote',
    PART_REMOTE = 'Part-remote',
    ON_SITE = 'On-site',
  }
  
  export enum suggestionType {
    TITLE = 'title',
    CITY = 'city'
  }

export interface JobOffer {
	salaryMin: number
	salaryMax: string
	preHighlight: ReactNode
	highlight: ReactNode
	postHighlight: ReactNode
	_id: string
	title: string
	company: string
	city: string
	country: string
	jobType: string
	seniority: Seniority
	location: WorkLocation
	salaryFrom: string
	salaryTo: number
	currency: string
	technologies: string[]
	description: string
	offerUrl: string
	createdAt: string
	updatedAt: string
	employmentType: string
	addedAt: string
	salary: string
	offerLink: string
	image: string
}