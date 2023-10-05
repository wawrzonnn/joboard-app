'use client';
import styles from './page.module.scss';
import { OffersContainer } from '@/components/OffersContainer/OffersContainer';
import { FilterProvider } from '@/contexts/FilterContext';
import { QueryClientProvider } from 'react-query';
import { queryClient } from '@/api/queryClient';
import { Container } from '@/components/Container/Container';
import { FiltersContainer } from '@/components/FiltersContainer/FiltersContainer';
import { Poppins } from 'next/font/google';
export default function Home() {
   return (
      <QueryClientProvider client={queryClient}>
         <Container>
            <div className={styles.container}>
               <FilterProvider>
                  <FiltersContainer />
                  <OffersContainer />
               </FilterProvider>
            </div>
         </Container>
      </QueryClientProvider>
   );
}
