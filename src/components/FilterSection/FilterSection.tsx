import React from 'react';
import styles from './FilterSection.module.scss';
import { Checkbox } from '../Checkbox/Checkbox';

interface FilterSectionProps {
   title: string;
   filters: string[];
   onFilterChange: (selectedFilters: (prevState: string[]) => string[]) => void;
}

export const FilterSection = ({ title, filters, onFilterChange }: FilterSectionProps) => {
   const handleChange =
   (filter: string) =>
   (e: React.ChangeEvent<HTMLInputElement>): void => {
      if (e.target.checked) {
         onFilterChange(prevState => [...prevState, filter]);
      } else {
         onFilterChange(prevState => prevState.filter(f => f !== filter));
      }
   };

   return (
      <div className={styles.container}>
         <span className={styles.title}>{title}</span>
         <div className={styles.checkboxes_container}>
            {filters.map((filter) => (
               <Checkbox key={filter} onChange={handleChange(filter)} label={filter} />
            ))}
         </div>
      </div>
   );
};
