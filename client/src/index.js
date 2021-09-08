import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import PizzasState from './contexts/pizzas/PizzasState';
import SearchState from './contexts/search/SearchState'
import CartState from './contexts/cart/CartState'

ReactDOM.render(
  <CartState>
    <PizzasState>
      <SearchState>
        <App />
      </SearchState>
    </PizzasState>
  </CartState>,
  document.getElementById('root')
);
