import React, { useState } from 'react';
import './App.scss';
import { Container } from './components/Container/Container';
import { FiltersContainer } from './components/FiltersContainer/FiltersContainer';
import { OffersContainer } from './components/OffersContainer/OffersContainer';
import { QueryClientProvider } from 'react-query';
import { queryClient } from './api/queryClient';

function App() {
   const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
   const [selectedSeniority, setSelectedSeniority] = useState<string[]>([]);
   const [selectedLocation, setSelectedLocation] = useState<string[]>([]);
   const [selectedSalary, setSelectedSalary] = useState<number>(0)
   return (
      <QueryClientProvider client={queryClient}>
         <Container>
            <div className="container">
               <FiltersContainer
                  setSelectedJobTypes={setSelectedJobTypes}
                  setSelectedSeniority={setSelectedSeniority}
                  setSelectedLocation={setSelectedLocation}
                  setSelectedSalary={setSelectedSalary}
               />
               <OffersContainer
                  selectedJobTypes={selectedJobTypes}
                  selectedSeniority={selectedSeniority}
                  selectedLocation={selectedLocation}
                  selectedSalary={selectedSalary}
               />
            </div>
         </Container>
      </QueryClientProvider>
   );
}

export default App;
