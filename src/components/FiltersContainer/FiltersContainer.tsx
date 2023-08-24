import React from 'react';
import styles from './FiltersContainer.module.scss';
import { Logo } from '../Logo/Logo';
import { FilterSection } from '../FilterSection/FilterSection';
import { FilterSectionSalary } from '../FilterSectionSalary/FilterSectionSalary';

const jobType = ['Full-time', 'Contract', 'Part-time', 'Freelance'];
const seniority = ['Lead', 'Expert', 'Senior', 'Mid/Regular', 'Junior', 'Intern'];
const location = ['Remote', 'Part-remote', 'On-site'];

export const FiltersContainer = () => {
   return (
      <div className={styles.container}>
         <Logo />
         <div className={styles.filters_wrapper}>
            <header className={styles.header}>
               <p className={styles.header_title}>Filter offers</p>
               <button className={styles.clear_button}>Clear filters</button>
            </header>
            <section>
               <FilterSection title="Job type" filters={jobType} />
               <FilterSection title="Seniority" filters={seniority} />
               <FilterSection title="Location" filters={location} />
               <FilterSectionSalary />
            </section>
         </div>
      </div>
   );
};
