import React, { useState } from 'react';
import './App.scss';
import { Container } from './components/Container/Container';
import { FiltersContainer } from './components/FiltersContainer/FiltersContainer';
import { OffersContainer } from './components/OffersContainer/OffersContainer';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './api/queryClient'

function App() {
   const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
   return (
      <QueryClientProvider client={queryClient}>
         <Container>
            <div className="container">
               <FiltersContainer setSelectedJobTypes={setSelectedJobTypes} />
               <OffersContainer selectedJobTypes={selectedJobTypes} />
            </div>
         </Container>
      </QueryClientProvider>
   );
}

export default App;