import React from 'react';
import styles from './SearchInput.module.scss';
import { JobOffer } from '../../api/types';

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
   suggestionType: 'title' | 'city';
}

export const SearchInput: React.FC<SearchInputProps> = ({
   label,
   placeholder,
   id,
   onChange,
   name,
   value,
   icon,
   suggestions = [],
   onSuggestionClick,
   suggestionType,
}) => {
   const renderSuggestion = (offer: JobOffer) => {
      const inputValue = value!.toLowerCase();
      const data = offer[suggestionType];
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
      <div className={styles.wrapper}>
         <label htmlFor={id}>{label}</label>
         <input
            className={styles.input}
            id={id}
            placeholder={placeholder}
            onChange={onChange}
            name={name}
            value={value}
         />
         <span className={styles.icon}>{icon}</span>
         <ul className={styles.suggestions}>
            {suggestions.map((offer) => (
               <li key={offer._id} onClick={() => onSuggestionClick?.(offer[suggestionType])}>
                  <div className={styles.suggestion_content}>
                     <div>{renderSuggestion(offer)}</div>
                     {suggestionType === 'title' && (
                        <div className={styles.company_name}>{offer.companyName}</div>
                     )}
                  </div>
               </li>
            ))}
         </ul>
      </div>
   );
};
