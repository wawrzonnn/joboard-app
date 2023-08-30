import React from 'react';
import styles from './App.module.scss';
import { Container } from './components/Container/Container';
import { FiltersContainer } from './components/FiltersContainer/FiltersContainer';
import { OffersContainer } from './components/OffersContainer/OffersContainer';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './api/queryClient';
import { FilterProvider } from './contexts/FilterContext';

function App() {
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

export default App;