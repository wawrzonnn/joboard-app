import React, { useState } from 'react';
import styles from './FiltersContainer.module.scss';
import { Logo } from '../Logo/Logo';
import { FilterSection } from '../FilterSection/FilterSection';
import { FilterSectionSalary } from '../FilterSectionSalary/FilterSectionSalary';
import { ClearButton } from '../ClearButton/ClearButton';
import FiltersButton from '../FiltersButton/FiltersButton';
import { JobType, Seniority, WorkLocation } from '../../api/types';

const jobType = Object.values(JobType);
const seniority = Object.values(Seniority);
const location = Object.values(WorkLocation);

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

interface FiltersContainerProps {
   setSelectedJobTypes: SetState<string[]>;
   setSelectedSeniority: SetState<string[]>;
}

export const FiltersContainer = ({
   setSelectedJobTypes,
   setSelectedSeniority,
}: FiltersContainerProps) => {
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
               <FilterSection
                  title="Job type"
                  filters={jobType}
                  onFilterChange={setSelectedJobTypes}
               />
               <FilterSection
                  title="Seniority"
                  filters={seniority}
                  onFilterChange={setSelectedSeniority}
               />
               <FilterSection title="Location" filters={location} />
               <FilterSectionSalary />
            </section>
         </div>
      </div>
   );
};
