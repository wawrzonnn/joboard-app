'use client';
import styles from './page.module.scss';
import { OffersContainer } from '@/components/OffersContainer/OffersContainer';
import { FilterProvider } from '@/contexts/FilterContext';
import { Container } from '@/components/Container/Container';
import { FiltersContainer } from '@/components/FiltersContainer/FiltersContainer';
import { Poppins } from 'next/font/google';
export default function Home() {
   return (
         <Container>
            <div className={styles.container}>
               <FilterProvider>
                  <FiltersContainer />
                  <OffersContainer />
               </FilterProvider>
            </div>
         </Container>
   );
}
