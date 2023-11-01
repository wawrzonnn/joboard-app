import React, { useState, useEffect } from 'react';
import styles from './FilterSectionSalary.module.scss';

interface FilterSectionSalaryProps {
   setSelectedSalary: (value: number) => void;
   clearFiltersCount: number;
}

export const FilterSectionSalary = ({
   setSelectedSalary,
   clearFiltersCount,
}: FilterSectionSalaryProps) => {
   const [value, setValue] = useState(0);
   const MAX_SALARY = 50000;
   const leftPosition = (value / MAX_SALARY) * 97;

   useEffect(() => {
      setValue(0);
      setSelectedSalary(0);
   }, [clearFiltersCount, setSelectedSalary]);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = Number(e.target.value);
      setValue(newValue);
      setSelectedSalary(newValue);
   };

   return (
      <div className={styles.container}>
         <span className={styles.title}>Min. Salary (PLN/month)</span>
         <div className={styles.slider_container}>
            <input
               type="range"
               min="0"
               max={MAX_SALARY.toString()}
               step="250"
               value={value}
               onChange={handleChange}
               className={styles.slider}
            />
            <div className={styles.current_value} style={{ left: `${leftPosition}%` }}>
               {value}
            </div>
         </div>
      </div>
   );
};
