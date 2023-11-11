import React from 'react';
import styles from './FiltersButton.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

interface FiltersButtonProps {
   isOpen: boolean;
   setOpenMenu: (open: boolean) => void;
}

export const FiltersButton = ({ isOpen, setOpenMenu }: FiltersButtonProps) => {
   const handleToggle = () => {
      setOpenMenu(!isOpen);
   };

   const buttonLabel = isOpen ? 'Close' : 'Filter Offers';
   const buttonClass = cx(styles.default, { [styles.isToggled]: isOpen });

   return (
      <button className={buttonClass} onClick={handleToggle}>
         {buttonLabel}
      </button>
   );
};

export default FiltersButton;
