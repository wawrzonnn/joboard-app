import React from 'react';
import styles from './JobDetailsList.module.scss';
import { formatDistanceToNow } from 'date-fns';
import { JobOffer } from '../../../api/types';

interface JobDetailsListProps {
   offer: JobOffer | null;
}
const JobDetailsList = ({ offer }: JobDetailsListProps) => {
   if (!offer) return null;

   return (
      <ul className={styles.list_data}>
         <li className={styles.list_element_wrapper}>
            <span className={styles.list_element_header}>Added</span>
            <p className={styles.data_item}>
               {formatDistanceToNow(new Date(offer.createdAt), { addSuffix: true })}
            </p>
         </li>
         <li className={styles.list_element_wrapper}>
            <span className={styles.list_element_header}>Company</span>
            <p className={styles.data_item}>{offer.companyName}</p>
         </li>
         <li className={styles.list_element_wrapper}>
            <span className={styles.list_element_header}>Seniority</span>
            <p className={styles.data_item}>{offer.seniority}</p>
         </li>
         <li className={styles.list_element_wrapper}>
            <span className={styles.list_element_header}>Location</span>
            <div className={styles.data_wrapper}>
               <p className={styles.data_item}>{offer.city},</p>
               <p className={styles.data_item}>{offer.country}</p>
            </div>
         </li>
         <li className={styles.list_element_wrapper}>
            <span className={styles.list_element_header}>Job type</span>
            <p className={styles.data_item}>{offer.workLocation}</p>
         </li>
         <li className={styles.list_element_wrapper}>
            <span className={styles.list_element_header}>Contract</span>
            <p className={styles.data_item}>{offer.jobType}</p>
         </li>
         <li className={styles.list_element_salary}>
            <span className={styles.list_element_header}>Salary</span>
            <p className={styles.data_item}>{offer.salaryFrom} – {offer.salaryTo} {offer.currency} net</p>
         </li>
      </ul>
   );
};

export default JobDetailsList;
