import React from 'react';
import styles from './FiltersContainer.module.scss';
import Logo from '../Logo/Logo';
import FilterSection from '../FilterSection/FilterSection';

const jobType = ['Full-time', 'Contract', 'Part-time', 'Freelance'];
const seniority = ['Lead', 'Expert', 'Senior', 'Mid/Regular', 'Junior', 'Intern'];
const location = ['Remote', 'Part-remote', 'On-site'];

const FiltersContainer = () => {
   return (
      <div>
         <Logo />
         <div className={styles.container}>
            <header className={styles.header}>
               <p className={styles.header_title}>Filter offers</p>
               <button className={styles.clear_button}>Clear filters</button>
            </header>
            <section>
               <FilterSection title="Job Type" filters={jobType} />
               <FilterSection title="Seniority" filters={seniority} />
               <FilterSection title="Location" filters={location} />
            </section>
         </div>
      </div>
   );
};

export default FiltersContainer;
