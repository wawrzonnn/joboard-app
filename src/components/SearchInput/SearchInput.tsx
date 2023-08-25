import * as React from 'react';
import styles from './SearchInput.module.scss';
import { JobOffer } from '../../api/types';

export interface SearchInputProps {
   label?: string;
   placeholder?: string;
   id?: string;
   onChange(event: React.ChangeEvent<HTMLInputElement>): void;
   name?: string;
   value?: string;
   icon?: React.ReactNode;
   suggestions?: JobOffer[];
   onSuggestionClick?: (title: string) => void;
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
   onSuggestionClick
}: SearchInputProps) => {

   const renderSuggestion = (title: string) => {
      const inputValue = value!.toLowerCase();
      const startIdx = title.toLowerCase().indexOf(inputValue);
      const endIdx = startIdx + inputValue.length;
      return (
         <>
            {title.substring(0, startIdx)}
            <strong>{title.substring(startIdx, endIdx)}</strong>
            {title.substring(endIdx)}
         </>
      );
   };
   
   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(event);
   };

   const handleSuggestionClick = (title: string) => {
      onSuggestionClick?.(title);
   };

   return (
      <div className={styles.wrapper}>
         <label htmlFor={id}>{label}</label>
         <input
            className={styles.input}
            id={id}
            placeholder={placeholder}
            onChange={handleChange}
            name={name}
            value={value}
         />
         <span className={styles.icon}>{icon}</span>
         <ul className={styles.suggestions}>
            {suggestions.map((offer) => (
               <li key={offer._id} onClick={() => handleSuggestionClick(offer.title)}>
                  <div className={styles.suggestion_content}>
                     <div>
                        {renderSuggestion(offer.title)}
                     </div>
                     <div className={styles.company_name}>{offer.companyName}</div>
                  </div>
               </li>
            ))}
         </ul>
      </div>
   );
};





