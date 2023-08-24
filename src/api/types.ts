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

export interface JobOffer {
  _id: string;
  title: string;
  companyName: string;
  city: string;
  country: string;
  jobType: JobType;
  seniority: Seniority;
  workLocation: WorkLocation;
  salaryFrom: number;
  salaryTo: number;
  currency: string;
  technologies: string[];
  description: string;
  offerUrl: string;
  createdAt: string;
  updatedAt: string;
}