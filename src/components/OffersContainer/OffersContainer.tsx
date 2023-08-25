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
   const [searchForLocation, setSearchForLocation] = useState('');
   const [titleSuggestions, setTitleSuggestions] = useState<JobOffer[]>([]);
   const [locationSuggestions, setLocationSuggestions] = useState<JobOffer[]>([]);

   const filterOffers = (title: string, location: string) => {
      if (jobOffers) {
         const matchedOffers = jobOffers.filter((offer) =>
            (!title || offer.title.toLowerCase().includes(title.toLowerCase())) &&
            (!location || offer.city.toLowerCase().includes(location.toLowerCase()))
         );
         setFilteredOffers(matchedOffers);
      }
   };

   const handleSearchByJobTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      setSearchForJobTitle(inputValue);
      if (!inputValue) {
          filterOffers('', searchForLocation);
          setTitleSuggestions([]);
      } else if (jobOffers) {
          const matchedOffers = jobOffers.filter((offer) =>
              offer.title.toLowerCase().includes(inputValue.toLowerCase()),
          );
          setTitleSuggestions(matchedOffers);
      } else {
          setTitleSuggestions([]);
      }
  };
  
  const handleSearchByLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      setSearchForLocation(inputValue);
      if (!inputValue) {
          filterOffers(searchForJobTitle, '');
          setLocationSuggestions([]);
      } else if (jobOffers) {
          const matchedOffers = jobOffers.filter((offer) =>
              offer.city.toLowerCase().includes(inputValue.toLowerCase()),
          );
          setLocationSuggestions(matchedOffers);
      } else {
          setLocationSuggestions([]);
      }
  };

   const handleTitleSuggestionClick = (title: string) => {
      setSearchForJobTitle(title);
      setTitleSuggestions([]);
      filterOffers(title, searchForLocation);
   };

   const handleLocationSuggestionClick = (city: string) => {
      setSearchForLocation(city);
      setLocationSuggestions([]);
      filterOffers(searchForJobTitle, city);
   };

   const handleClearFilters = () => {
      setSearchForJobTitle('');
      setSearchForLocation('');
      setTitleSuggestions([]);
      setLocationSuggestions([]);
      setFilteredOffers(jobOffers || []);
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
               onChange={handleSearchByJobTitle}
               onSuggestionClick={handleTitleSuggestionClick}
               suggestions={titleSuggestions}
               value={searchForJobTitle}
               icon={<SearchIcon />}
               suggestionType={'title'}
            />
            <SearchInput
               placeholder={'Search location'}
               onChange={handleSearchByLocation}
               onSuggestionClick={handleLocationSuggestionClick}
               suggestions={locationSuggestions}
               value={searchForLocation}
               icon={<MarkerIcon />}
               suggestionType={'city'}
            />
         </div>
         <OffersList
            offers={filteredOffers}
            searchForJobTitle={searchForJobTitle}
            searchForLocation={searchForLocation}
            onClearFilters={handleClearFilters}
         />
      </div>
   );
};
