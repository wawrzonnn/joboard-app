import React from 'react';
import styles from './OffersList.module.scss';
import companyLogo from '../../assets/images/companyLogo.jpg';
import { ClearButton } from '../ClearButton/ClearButton';
import { JobOffer } from '../../api/types';
import { formatDistanceToNow } from 'date-fns';

interface OffersListProps {
   offers: JobOffer[];
   searchForJobTitle: string;
   searchForLocation: string;
   onClearFilters: () => void;
}

export const OffersList = ({
   offers,
   searchForJobTitle,
   onClearFilters,
   searchForLocation,
}: OffersListProps) => {
   return (
      <div className={styles.container}>
         <span className={styles.offers_counter}>
            {offers.length || 0} offers found
            {searchForJobTitle && <> for "{searchForJobTitle}" </>}
            {searchForLocation && <> in "{searchForLocation}" </>}
            {(searchForJobTitle || searchForLocation) && onClearFilters && (
               <ClearButton onClick={onClearFilters}>Clear search</ClearButton>
            )}
         </span>
         <ul className={styles.list}>
            {offers.map((offer) => (
               <li key={offer._id} className={styles.list_element}>
                  <div className={styles.job_title_wrapper}>
                     <img className={styles.company_logo_desktop} src={companyLogo} alt="company logo" />
                     <div>
                        <span className={styles.job_title}>{offer.title}</span>
                        <div className={styles.info_wrapper}>
                        <img className={styles.company_logo_mobile} src={companyLogo} alt="company logo" />
                           <div className={styles.mobile_info_wrapper}>
                              <div className={styles.mobile_info_box}>
                                 <p className={styles.company_name}>{offer.companyName}</p>
                                 <p className={styles.single_info}>
                                    {offer.city}, {offer.country}
                                 </p>
                              </div>
                              <div className={styles.mobile_info_box}>
                                 <p className={styles.single_info}>{offer.workLocation}</p>
                                 <p className={styles.single_info}>{offer.seniority}</p>
                              </div>
                           
                           <p className={styles.salary}>
                              {offer.salaryFrom} – {offer.salaryTo} {offer.currency} net
                           </p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <span className={styles.offer_date}>
                     {formatDistanceToNow(new Date(offer.createdAt), { addSuffix: true })}
                  </span>
               </li>
            ))}
         </ul>
      </div>
   );
};
