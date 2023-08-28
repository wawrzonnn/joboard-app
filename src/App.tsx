import React from 'react';
import './App.scss';
import { Container } from './components/Container/Container';
import { FiltersContainer } from './components/FiltersContainer/FiltersContainer';
import { OffersContainer } from './components/OffersContainer/OffersContainer';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './api/queryClient'

function App() {
   return (
      <QueryClientProvider client={queryClient}>
         <Container>
            <div className="container">
               <FiltersContainer />
               <OffersContainer />
            </div>
         </Container>
      </QueryClientProvider>
   );
}

export default App;