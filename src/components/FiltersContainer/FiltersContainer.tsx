import React, { useState } from 'react';
import styles from './FiltersContainer.module.scss';
import { Logo } from '../Logo/Logo';
import { FilterSection } from './FilterSection/FilterSection';
import { FilterSectionSalary } from './FilterSectionSalary/FilterSectionSalary';
import { ClearButton } from '../ClearButton/ClearButton';
import FiltersButton from './FiltersButton/FiltersButton';
import { JobType, Seniority, WorkLocation } from '@/types/frontend/types';
import { useFilters } from '../../contexts/FilterContext';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const jobType = Object.values(JobType);
const seniority = Object.values(Seniority);
const location = Object.values(WorkLocation);

export const FiltersContainer = () => {
   const {
      setSelectedJobTypes,
      setSelectedSeniority,
      setSelectedLocation,
      setSelectedSalary,
      clearAllFilters,
   } = useFilters();

   const [clearFiltersCount, setClearFiltersCount] = useState<number>(0);
   const [openMenu, setOpenMenu] = useState<boolean>(false);

   const handleClearFilters = () => {
      clearAllFilters();
      setClearFiltersCount((prev) => prev + 1);
   };

   const handleOpenMenu = () => {
      setOpenMenu(!openMenu);
   };

   const getMobileMenuClasses = cx({
      [styles.filters_wrapper]: true,
      [styles.hidden]: !openMenu,
   });

   const getMobileHeaderClasses = cx({
      [styles.header_mobile]: true,
      [styles.header_mobile_padding]: openMenu,
   });

   return (
      <div className={styles.container}>
         <div className={getMobileHeaderClasses}>
            <Logo />
            <FiltersButton onClick={handleOpenMenu} />
         </div>
         <div className={getMobileMenuClasses}>
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
