import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import PizzasState from './contexts/pizzas/PizzasState';
import SearchState from './contexts/search/SearchState'

ReactDOM.render(
  <PizzasState>
    <SearchState>
      <App />
    </SearchState>
  </PizzasState>,
  document.getElementById('root')
);
