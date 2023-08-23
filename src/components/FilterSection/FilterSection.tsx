import React from 'react';
import styles from './FilterSection.module.scss';
import { Chceckbox } from '../Checkbox/Checkbox';

interface FilterSectionProps {
   title: string;
   filters: string[];
}

const FilterSection = ({ title, filters }: FilterSectionProps) => {
   return (
      <div className={styles.container}>
         <span className={styles.title}>{title}</span>
         <div className={styles.checkboxes_container}>
            {filters.map((filter) => (
               <Chceckbox
                  key={filter}
                  onChange={function (e: React.ChangeEvent<HTMLInputElement>): void {
                     console.log(`${filter} checkbox changed.`);
                  }}
                  label={filter}
               />
            ))}
         </div>
      </div>
   );
};

export default FilterSection;
