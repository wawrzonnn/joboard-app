import React from 'react';
import styles from './ClearButton.module.scss';

interface ClearButtonProps {
   children: React.ReactNode;
   onClick: () => void;
   type?: string;
}

export const ClearButton = ({ children, onClick }: ClearButtonProps) => {
   const handleClick = () => {
      onClick();
   };

   return (
      <button onClick={handleClick} type="button" className={styles.clear_button}>
         {children}
      </button>
   );
};

export default ClearButton;
