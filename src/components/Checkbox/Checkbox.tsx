import * as React from 'react';
import { PropsWithChildren, useEffect, useState } from 'react';
import styles from './Checkbox.module.scss';

import { CheckboxChecked } from '../../assets/icons/Checkbox/Checked';
import { CheckboxUnchecked } from '../../assets/icons/Checkbox/Unchecked';


export interface ChceckboxProps {
   checked?: boolean;
   onChange(e: React.ChangeEvent<HTMLInputElement>): void;
   id?: string;
   label: string;
   name?: string;
}

export const Checkbox = ({
   checked = true,
   id,
   onChange,
   label,
   name,
}: PropsWithChildren<ChceckboxProps>) => {
   const [isChecked, setIsChecked] = useState(checked);

   useEffect(() => {
      setIsChecked(checked);
   }, [checked]);


   return (
      <div className={styles.wrapper}>
         <div
            className={styles.checkbox}
            onClick={(e) => {
               setIsChecked(!isChecked);
            }}
         >
            {isChecked ? <CheckboxChecked /> : <CheckboxUnchecked />}
            <input
               type="checkbox"
               checked={isChecked}
               onChange={(e) => {
                  setIsChecked(!isChecked);
                  onChange(e);
               }}
               id={id}
               name={name}
               className={styles.hidden_checkbox}
            />
         </div>
         <div>
         <label
            htmlFor={id}
            className={styles.label}
            onClick={(e) => {
               setIsChecked(!isChecked);
            }}
         >
            {label}
         </label></div>
      </div>
   );
};
