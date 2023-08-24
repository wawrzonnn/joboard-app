import React from 'react';
import styles from './FilterSection.module.scss';
import { Checkbox } from '../Checkbox/Checkbox'; // Corrected typo

interface FilterSectionProps {
   title: string;
   filters: string[];
}

export const FilterSection = ({ title, filters }: FilterSectionProps) => {
   const handleChange =
      (filter: string) =>
      (e: React.ChangeEvent<HTMLInputElement>): void => {
         console.log(`${filter} checkbox changed.`);
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