/* eslint-disable @next/next/no-img-element */
import React from 'react';
import styles from './JobOfferModal.module.scss';
import Image from 'next/image'
import { XMark } from '../../assets/icons/XMark';
import JobDetailsList from './JobDetailsList/JobDetailsList';
import { JobOffer } from '@/types/frontend/types'

interface JobOfferModalProps {
   offer: JobOffer | null;
   onClick: () => void;
}
export const JobOfferModal = ({ offer, onClick }: JobOfferModalProps) => {
   if (!offer) return null;

   return (
      <>
         <div className={styles.modal_overlay} onClick={onClick}></div>
         <div className={styles.container}>
            <div>
               <img className={styles.company_logo_mobile} src={offer.image} alt="company logo"/>
               <div className={styles.xmark} onClick={onClick}>
                  <XMark />
               </div>
               <div className={styles.job_title_wrapper}>
               <img
                     className={styles.company_logo_desktop}
                     src={offer.image}
                     alt="company logo"
                  />
                  <div className={styles.header_wrapper}>
                     <span className={styles.job_title}>{offer.title}</span>
                     <p className={styles.tech_stack}>
                        {offer.technologies.join('・').toUpperCase()}
                     </p>
                  </div>
               </div>
            </div>
            <div className={styles.content_container}>
               <div className={styles.description_wrapper}>
                  <span className={styles.description_title}>Offer description</span>
                  <p className={styles.description_text}>{offer.description}</p>
               </div>
               <div className={styles.data_wrapper}>
                  <div className={styles.button_wrapper}>
                     <a href={offer.offerLink} target="_blank" rel="noopener noreferrer">
                        <button className={styles.visit_offer_button}>
                           <span>Visit offer ➔</span>
                        </button>
                     </a>
                  </div>
                  <JobDetailsList offer={offer} />
               </div>
            </div>
         </div>
      </>
   );
};

export default JobOfferModal;
