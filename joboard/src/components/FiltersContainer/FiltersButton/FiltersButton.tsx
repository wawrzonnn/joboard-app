import React, { useState } from 'react';
import styles from './FiltersButton.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

interface FiltersButtonProps {
   onToggle?: () => void;
   onClick?: () => void;
}

export const FiltersButton = ({ onToggle, onClick }: FiltersButtonProps) => {
   const [isToggled, setIsToggled] = useState(false);

   const handleToggle = () => {
      setIsToggled(!isToggled);
      if (onToggle) {
         onToggle();
      }
      if (onClick) {
         onClick(); 
      }
   };

   const getButtonClasses = cx({
      [styles.default]: true,
      [styles.isToggled]: isToggled,
   });
   
   return (
      <button className={getButtonClasses} onClick={handleToggle}>
         {isToggled ? 'Close' : 'Filter offers'}
      </button>
   );
};

export default FiltersButton;
