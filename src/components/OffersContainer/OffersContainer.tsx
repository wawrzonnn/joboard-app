import React, { useState } from 'react';
import styles from './OffersContainer.module.scss';
import { SearchInput } from '../SearchInput/SearchInput';
import { SearchIcon } from '../../assets/icons/Search';
import { MarkerIcon } from '../../assets/icons/Marker';
import { OffersList } from '../OffersList/OffersList';

export const OffersContainer = () => {
   const [searchForInput, setSearchForInput] = useState('');
   const [searchLocationInput, setSearchLocationInput] = useState('');

   const handleInputForChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchForInput(event.target.value);
   };

   const handleInputLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchLocationInput(event.target.value);
   };

   return (
      <div className={styles.container}>
         <div className={styles.inputs_wrapper}>
            <SearchInput
               placeholder={'Search for'}
               onChange={handleInputForChange}
               icon={<SearchIcon />}
            />
            <SearchInput
               placeholder={'Search location'}
               onChange={handleInputLocationChange}
               icon={<MarkerIcon />}
            />
         </div>
         <OffersList />
      </div>
   );
};


