import React from 'react';
import styles from './OffersList.module.scss';
import companyLogo from '../../assets/images/companyLogo.jpg';

export const OffersList = () => {
   return (
      <div className={styles.container}>
         <span className={styles.offers_counter}>36 offers found</span>
         <ul className={styles.list}>
            {Array.from({ length: 9 }).map((_, index) => (
               <li key={index} className={styles.list_element}>
                  <div className={styles.job_title_wrapper}>
                     <img className={styles.company_logo} src={companyLogo} alt="company logo" />
                     <div>
                        <span className={styles.job_title}>Infrastructure Architect</span>
                        <div className={styles.info_wrapper}>
                           <p className={styles.company_name}>GOPro</p>
                           <p className={styles.single_info}>Barcelona, Spain</p>
                           <p className={styles.single_info}>Fully remote</p>
                           <p className={styles.single_info}>Senior</p>
                           <p className={styles.salary}>10 000 – 18 000 PLN net</p>
                        </div>
                     </div>
                  </div>
                  <span className={styles.offer_date}>7 days ago</span>
               </li>
            ))}
         </ul>
      </div>
   );
};
