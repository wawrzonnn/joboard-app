import React from 'react';
import styles from './JobDetails.module.scss';
const JobDetailsList = () => {
   return (
      <ul className={styles.list_data}>
         <li className={styles.list_element_wrapper}>
            <span className={styles.list_element_header}>Added</span>
            <p className={styles.data_item}>4 days ago</p>
         </li>
         <li className={styles.list_element_wrapper}>
            <span className={styles.list_element_header}>Company</span>
            <p className={styles.data_item}>GoPro</p>
         </li>
         <li className={styles.list_element_wrapper}>
            <span className={styles.list_element_header}>Seniority</span>
            <p className={styles.data_item}>Senior</p>
         </li>
         <li className={styles.list_element_wrapper}>
            <span className={styles.list_element_header}>Location</span>
            <div className={styles.data_wrapper}>
               <p className={styles.data_item}>Barcelona,</p>
               <p className={styles.data_item}>Spain</p>
            </div>
         </li>
         <li className={styles.list_element_wrapper}>
            <span className={styles.list_element_header}>Job type</span>
            <p className={styles.data_item}>Hybrid</p>
         </li>
         <li className={styles.list_element_wrapper}>
            <span className={styles.list_element_header}>Contract</span>
            <p className={styles.data_item}>B2B</p>
         </li>
         <li className={styles.list_element_salary}>
            <span className={styles.list_element_header}>Salary</span>
            <p className={styles.data_item}>10 000 – 18 000 PLN net</p>
         </li>
      </ul>
   );
};

export default JobDetailsList;
