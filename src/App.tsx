import React from 'react';
import './App.css';
import { Container } from './components/Container/Container';
import FiltersContainer from './components/FiltersContainer/FiltersContainer';
import OffersContainer from './components/OffersContainer/OffersContainer';

function App() {
   return (
      <Container>
         <div className="container">
            <FiltersContainer />
            <OffersContainer />
         </div>
      </Container>
   );
}

export default App;
