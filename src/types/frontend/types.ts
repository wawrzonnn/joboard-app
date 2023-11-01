import { ReactNode } from "react"

export enum JobType {
    FULL_TIME = 'Full-time',
    CONTRACT = 'Contract',
    PART_TIME = 'Part-time',
    FREELANCE = 'Freelance',
  }
  
  export enum Seniority {
    JUNIOR = 'Junior',
    MID = 'Mid',
    SENIOR = 'Senior',
}

export enum Position {
    FRONTEND = 'Frontend',
    BACKEND = 'Backend',
    FULLSTACK = 'Fullstack',
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
	_id: string
	salaryMin: number
	salaryMax: string
	preHighlight: ReactNode
	highlight: ReactNode
	postHighlight: ReactNode
	title: string
	company: string
	city: string
	jobType: string
	seniority: Seniority
	location: WorkLocation
	position: Position
	technologies: string[]
	description: string
	offerUrl: string
	employmentType: string
	addedAt: string
	salary: string
	offerLink: string
	image: string
}