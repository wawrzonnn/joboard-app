import React, { useState } from 'react';
import styles from './FilterSectionSalary.module.scss';

interface FilterSectionSalaryProps {
   setSelectedSalary: (value: number) => void;
}

export const FilterSectionSalary = ({ setSelectedSalary }: FilterSectionSalaryProps) => {
   const [value, setValue] = useState(0);
   const leftPosition = value / 1245;

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       const newValue = Number(e.target.value);
       setValue(newValue);
       setSelectedSalary(newValue);
   };
   return (
      <div className={styles.container}>
         <span className={styles.title}>Salary (min.)</span>
         <div className={styles.slider_container}>
            <input
               type="range"
               min="0"
               max="120000"
               step="1500"
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
