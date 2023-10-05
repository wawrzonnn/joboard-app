'use client'
import React, { useState, useEffect } from 'react';
import styles from './OffersContainer.module.scss';
import { SearchInput } from '../SearchInput/SearchInput';
import { SearchIcon } from '../../assets/icons/Search';
import { MarkerIcon } from '../../assets/icons/Marker';
import { OffersList } from './OffersList/OffersList';
import { useQuery } from 'react-query';
import { JobOffer, suggestionType } from '../../api/types';
import { fetchJobOffers } from '../../api/jobOffers';
import { removeDuplicatesSuggestion } from '../../utils/removeDuplicateSuggestion';
import { useFilters } from '../../contexts/FilterContext';

export const OffersContainer = () => {
   const { selectedJobTypes, selectedSeniority, selectedLocation, selectedSalary } = useFilters();
   const { data: jobOffers } = useQuery<JobOffer[]>('jobOffers', fetchJobOffers);
   const [filteredOffers, setFilteredOffers] = useState<JobOffer[]>([]);
   const [searchForJobTitle, setSearchForJobTitle] = useState('');
   const [searchForLocation, setSearchForLocation] = useState('');
   const [titleSuggestions, setTitleSuggestions] = useState<JobOffer[]>([]);
   const [locationSuggestions, setLocationSuggestions] = useState<JobOffer[]>([]);

   const filterOffers = (title: string, location: string) => {
      if (jobOffers) {
         const matchedOffers = jobOffers.filter(
            (offer) =>
               (!title || offer.title.toLowerCase().includes(title.toLowerCase())) &&
               (!location || offer.city.toLowerCase().includes(location.toLowerCase())) &&
               (!selectedJobTypes.length || selectedJobTypes.includes(offer.jobType)) &&
               (!selectedSeniority.length || selectedSeniority.includes(offer.seniority)) &&
               (!selectedLocation.length || selectedLocation.includes(offer.workLocation)) &&
               (!selectedSalary || selectedSalary <= offer.salaryFrom),
         );
         setFilteredOffers(matchedOffers);
      }
   };

   const handleSearchByJobTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      setSearchForJobTitle(inputValue);

      if (!inputValue) {
         setTitleSuggestions([]);
      } else if (jobOffers) {
         const matchedOffers = jobOffers.filter((offer) =>
            offer.title.toLowerCase().includes(inputValue.toLowerCase()),
         );
         setTitleSuggestions(removeDuplicatesSuggestion(matchedOffers, suggestionType.TITLE));
      } else {
         setTitleSuggestions([]);
      }

      filterOffers(inputValue, searchForLocation);
   };

   const handleSearchByLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;
      setSearchForLocation(inputValue);

      if (!inputValue) {
         setLocationSuggestions([]);
      } else if (jobOffers) {
         const matchedOffers = jobOffers.filter((offer) =>
            offer.city.toLowerCase().includes(inputValue.toLowerCase()),
         );
         setLocationSuggestions(removeDuplicatesSuggestion(matchedOffers, suggestionType.CITY));
      } else {
         setLocationSuggestions([]);
      }

      filterOffers(searchForJobTitle, inputValue);
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
      filterOffers(searchForJobTitle, searchForLocation);
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [jobOffers, selectedJobTypes, selectedSeniority, selectedLocation, selectedSalary]);

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
               typeOfSuggestion={suggestionType.TITLE}
            />
            <SearchInput
               placeholder={'Search location'}
               onChange={handleSearchByLocation}
               onSuggestionClick={handleLocationSuggestionClick}
               suggestions={locationSuggestions}
               value={searchForLocation}
               icon={<MarkerIcon />}
               typeOfSuggestion={suggestionType.CITY}
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
