import React from 'react';
import styles from './OffersList.module.scss';
import companyLogo from '../../assets/images/companyLogo.jpg';
import { useQuery } from 'react-query';
import { fetchJobOffers } from '../../api/jobOffers'; 
import { JobOffer } from '../../api/types';
import { formatDistanceToNow } from 'date-fns';

export const OffersList = () => {
   const { data: jobOffers } = useQuery<JobOffer[]>('jobOffers', fetchJobOffers);

   return (
      <div className={styles.container}>
         <span className={styles.offers_counter}>{jobOffers?.length || 0} offers found</span>
         <ul className={styles.list}>
            {jobOffers?.map((offer) => (
               <li key={offer._id} className={styles.list_element}>
                  <div className={styles.job_title_wrapper}>
                     <img className={styles.company_logo} src={companyLogo} alt="company logo" />
                     <div>
                        <span className={styles.job_title}>{offer.title}</span>
                        <div className={styles.info_wrapper}>
                           <p className={styles.company_name}>{offer.companyName}</p>
                           <p className={styles.single_info}>{offer.city}, {offer.country}</p>
                           <p className={styles.single_info}>{offer.workLocation}</p>
                           <p className={styles.single_info}>{offer.seniority}</p>
                           <p className={styles.salary}>{offer.salaryFrom} – {offer.salaryTo} {offer.currency} net</p>
                        </div>
                     </div>
                  </div>
                  <span className={styles.offer_date}>{formatDistanceToNow(new Date(offer.createdAt), { addSuffix: true })}</span>
               </li>
            ))}
         </ul>
      </div>
   );
};