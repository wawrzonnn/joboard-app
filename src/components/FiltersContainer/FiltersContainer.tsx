import React, { useState } from 'react';
import styles from './FiltersContainer.module.scss';
import { Logo } from '../Logo/Logo';
import { FilterSection } from '../FilterSection/FilterSection';
import { FilterSectionSalary } from '../FilterSectionSalary/FilterSectionSalary';
import { ClearButton } from '../ClearButton/ClearButton';
import FiltersButton from '../FiltersButton/FiltersButton';
import { JobType, Seniority, WorkLocation } from '../../api/types';

const jobType = Object.values(JobType)
const seniority = Object.values(Seniority)
const location = Object.values(WorkLocation)

interface FiltersContainerProps {
   setSelectedJobTypes: React.Dispatch<React.SetStateAction<string[]>>;
}

export const FiltersContainer = ({ setSelectedJobTypes }: FiltersContainerProps) => {
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
            <FilterSection title="Job type" filters={jobType} onFilterChange={setSelectedJobTypes} />
               <FilterSection title="Seniority" filters={seniority} onFilterChange={function (selectedFilters: (prevState: string[]) => string[]): void {
                  throw new Error('Function not implemented.');
               } } />
               <FilterSection title="Location" filters={location} onFilterChange={function (selectedFilters: (prevState: string[]) => string[]): void {
                  throw new Error('Function not implemented.');
               } } />
               <FilterSectionSalary />
            </section>
         </div>
      </div>
   );
};
