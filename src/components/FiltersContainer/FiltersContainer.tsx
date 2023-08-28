import React, { useState } from 'react';
import styles from './FiltersContainer.module.scss';
import { Logo } from '../Logo/Logo';
import { FilterSection } from '../FilterSection/FilterSection';
import { FilterSectionSalary } from '../FilterSectionSalary/FilterSectionSalary';
import { ClearButton } from '../ClearButton/ClearButton';
import FiltersButton from '../FiltersButton/FiltersButton';

const jobType = ['Full-time', 'Contract', 'Part-time', 'Freelance'];
const seniority = ['Lead', 'Expert', 'Senior', 'Mid/Regular', 'Junior', 'Intern'];
const location = ['Remote', 'Part-remote', 'On-site'];

export const FiltersContainer = () => {
   const [filters, setFilters] = useState('');
   const handleClearFilters = () => {
      setFilters('');
   };

   return (
      <div className={styles.container}>
         <div className={styles.header_mobile}>
            <Logo />
            <FiltersButton />
         </div>
         <div className={styles.filters_wrapper}>
            <header className={styles.header}>
               <p className={styles.header_title}>Filter offers</p>
               <ClearButton onClick={handleClearFilters}>Clear filters</ClearButton>
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
