import React, { useState, useEffect } from 'react';
import styles from './OffersContainer.module.scss';
import { SearchInput } from '../SearchInput/SearchInput';
import { SearchIcon } from '../../assets/icons/Search';
import { MarkerIcon } from '../../assets/icons/Marker';
import { OffersList } from '../OffersList/OffersList';
import { useQuery } from 'react-query';
import { JobOffer } from '../../api/types';
import { fetchJobOffers } from '../../api/jobOffers';

export const OffersContainer = () => {
   const { data: jobOffers } = useQuery<JobOffer[]>('jobOffers', fetchJobOffers);
   const [filteredOffers, setFilteredOffers] = useState<JobOffer[]>(jobOffers || []);
   const [searchForJobTitle, setSearchForJobTitle] = useState('');
   const [suggestedOffers, setSuggestedOffers] = useState<JobOffer[]>([]);

   const handleInputForChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      const lowerCaseInputValue = inputValue.toLowerCase();
      setSearchForJobTitle(inputValue);

      if (jobOffers) {
         if (inputValue) {
            const filteredOffers = jobOffers.filter((offer) =>
               offer.title.toLowerCase().includes(lowerCaseInputValue),
            );
            setSuggestedOffers(filteredOffers);
         } else {
            setSuggestedOffers([]);
            setFilteredOffers(jobOffers);
         }
      }
   };

   const handleSuggestionClick = (title: string) => {
      setSearchForJobTitle(title);
      setSuggestedOffers([]);
      if (jobOffers) {
         const lowerCaseTitle = title.toLowerCase();
         const matchingOffers = jobOffers.filter((offer) =>
            offer.title.toLowerCase().includes(lowerCaseTitle),
         );
         setFilteredOffers(matchingOffers);
      }
   };

   const handleClearFilters = () => {
      setSearchForJobTitle('');
      setSuggestedOffers([]);
      if (jobOffers) {
         setFilteredOffers(jobOffers);
      }
   };

   useEffect(() => {
      if (jobOffers) {
         setFilteredOffers(jobOffers);
      }
   }, [jobOffers]);

   return (
      <div className={styles.container}>
         <div className={styles.inputs_wrapper}>
            <SearchInput
               placeholder={'Search for'}
               onChange={handleInputForChange}
               onSuggestionClick={handleSuggestionClick}
               icon={<SearchIcon />}
               suggestions={suggestedOffers}
               value={searchForJobTitle}
            />
            <SearchInput
               placeholder={'Search location'}
               onChange={() => console.log('Changed')
               }
               icon={<MarkerIcon />}
            />
         </div>
         <OffersList
            offers={filteredOffers}
            searchForJobTitle={searchForJobTitle}
            onClearFilters={handleClearFilters}
         />
      </div>
   );
};
