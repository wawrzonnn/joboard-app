import React, { useState } from 'react';
import styles from './FiltersContainer.module.scss';
import { Logo } from '../Logo/Logo';
import { FilterSection } from '../FilterSection/FilterSection';
import { FilterSectionSalary } from '../FilterSectionSalary/FilterSectionSalary';
import { ClearButton } from '../ClearButton/ClearButton';
import FiltersButton from '../FiltersButton/FiltersButton';
import { JobType, Seniority, WorkLocation } from '../../api/types';
import { useFilters } from '../../contexts/FilterContext';
const jobType = Object.values(JobType);
const seniority = Object.values(Seniority);
const location = Object.values(WorkLocation);

export const FiltersContainer = () => {
   const { setSelectedJobTypes, setSelectedSeniority, setSelectedLocation, setSelectedSalary, clearAllFilters } =
      useFilters();

   const [clearFiltersCount, setClearFiltersCount] = useState<number>(0);

   const handleClearFilters = () => {
      clearAllFilters()
      setClearFiltersCount((prev) => prev + 1);
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
               <FilterSection
                  title="Job type"
                  filters={jobType}
                  onFilterChange={setSelectedJobTypes}
                  clearFiltersCount={clearFiltersCount}
               />
               <FilterSection
                  title="Seniority"
                  filters={seniority}
                  onFilterChange={setSelectedSeniority}
                  clearFiltersCount={clearFiltersCount}
               />
               <FilterSection
                  title="Location"
                  filters={location}
                  onFilterChange={setSelectedLocation}
                  clearFiltersCount={clearFiltersCount}
               />
               <FilterSectionSalary
                  setSelectedSalary={setSelectedSalary}
                  clearFiltersCount={clearFiltersCount}
               />
            </section>
         </div>
      </div>
   );
};
