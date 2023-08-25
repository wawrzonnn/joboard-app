import React, { useState } from 'react';
import styles from './FilterSectionSalary.module.scss';

export const FilterSectionSalary = () => {
   const [value, setValue] = useState(0);

   const leftPosition = value / 415;

   return (
      <div className={styles.container}>
         <span className={styles.title}>Salary (min.)</span>
         <div className={styles.slider_container}>
            <input
               type="range"
               min="0"
               max="40000"
               step="500"
               value={value}
               onChange={(e) => setValue(Number(e.target.value))}
               className={styles.slider}
            />
            <div className={styles.current_value} style={{ left: `${leftPosition}%` }}>
               {value}
            </div>
         </div>
      </div>
   );
};
