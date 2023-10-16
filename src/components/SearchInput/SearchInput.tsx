import React, { useRef, useEffect, useState } from 'react';
import styles from './SearchInput.module.scss';
import { JobOffer, suggestionType } from '../../api/types';
import { useOutsideClick } from '../../hooks/useOutsideClick';
interface SearchInputProps {
   label?: string;
   placeholder?: string;
   id?: string;
   onChange(event: React.ChangeEvent<HTMLInputElement>): void;
   name?: string;
   value?: string;
   icon?: React.ReactNode;
   suggestions?: JobOffer[];
   onSuggestionClick?: (value: string) => void;
   typeOfSuggestion: suggestionType;
}

export const SearchInput = ({
   label,
   placeholder,
   id,
   onChange,
   name,
   value,
   icon,
   suggestions = [],
   onSuggestionClick,
   typeOfSuggestion,
}: SearchInputProps) => {
   const [showSuggestions, setShowSuggestions] = useState<boolean>(true);
   const wrapperRef = useRef<HTMLDivElement | null>(null);

   useOutsideClick(wrapperRef, () => {
      setShowSuggestions(false);
   });

   const handleFocus = () => {
      setShowSuggestions(true);
   };

   const renderSuggestion = (offer: JobOffer) => {
      const inputValue = value!.toLowerCase();
      const data = offer[typeOfSuggestion];
      const lowerData = data.toLowerCase();
      const startIdx = lowerData.indexOf(inputValue);
      const endIdx = startIdx + inputValue.length;
      return (
         <>
            {data.substring(0, startIdx)}
            <strong>{data.substring(startIdx, endIdx)}</strong>
            {data.substring(endIdx)}
         </>
      );
   };

   return (
      <div className={styles.wrapper} ref={wrapperRef}>
         <label htmlFor={id}>{label}</label>
         <div className={styles.icon_wrapper}>
            <input
               className={styles.input}
               id={id}
               placeholder={placeholder}
               onChange={onChange}
               name={name}
               value={value}
               onFocus={handleFocus}
            />
            <span className={styles.icon}>{icon}</span>
            {showSuggestions && suggestions.length > 0 && (
               <ul className={styles.suggestions}>
                  {suggestions.map((offer) => (
                     <li
                        key={offer._id}
                        onClick={() => onSuggestionClick?.(offer[typeOfSuggestion])}
                     >
                        <div className={styles.suggestion_content}>
                           <div>{renderSuggestion(offer)}</div>
                           {typeOfSuggestion === suggestionType.TITLE && (
                              <div className={styles.company_name}>{offer.company}</div>
                           )}
                        </div>
                     </li>
                  ))}
               </ul>
            )}
         </div>
      </div>
   );
};
