import { ReactNode } from 'react'

export enum EmploymentType {
	B2B = 'B2B',
	CONTRACT = 'Contract',
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

export enum Location {
	REMOTE = 'Remote',
	HYBRID = 'Hybrid',
}

export enum suggestionType {
	TITLE = 'title',
	CITY = 'city',
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
	location: Location
	position: Position
	technologies: string[]
	description: string
	offerUrl: string
	employmentType: EmploymentType
	addedAt: string
	salary: string
	offerLink: string
	image: string
}
