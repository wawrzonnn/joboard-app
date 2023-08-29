import * as React from 'react';
import { PropsWithChildren, useEffect, useState } from 'react';
import styles from './Checkbox.module.scss';

import { CheckboxChecked } from '../../assets/icons/Checkbox/Checked';
import { CheckboxUnchecked } from '../../assets/icons/Checkbox/Unchecked';


export interface CheckboxProps {
   checked?: boolean;
   onChange(e: React.ChangeEvent<HTMLInputElement>): void;
   id?: string;
   label: string;
   name?: string;
}

export const Checkbox = ({
   checked = false,
   id,
   onChange,
   label,
   name,
}: PropsWithChildren<CheckboxProps>) => {
   const [isChecked, setIsChecked] = useState(checked);

   useEffect(() => {
      setIsChecked(checked);
   }, [checked]);

   const handleToggle = (e: React.MouseEvent) => {
      setIsChecked(!isChecked);
      const fakeEvent = {
         target: {
            checked: !isChecked,
            name: name
         }
      } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange(fakeEvent);
   };

   return (
      <div className={styles.wrapper} onClick={handleToggle}>
         <div className={styles.checkbox}>
            {isChecked ? <CheckboxChecked /> : <CheckboxUnchecked />}
            <input
               type="checkbox"
               checked={isChecked}
               onChange={() => {}}
               id={id}
               name={name}
               className={styles.hidden_checkbox}
            />
         </div>
         <div>
            <label htmlFor={id} className={styles.label}>
               {label}
            </label>
         </div>
      </div>
   );
};
