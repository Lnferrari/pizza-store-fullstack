import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import PizzasState from "../contexts/pizzas/PizzasState";
import Header from './Header'
import PizzaList from "./PizzaList";
import Cart from './Cart'

import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from "./Home";
import { useContext } from "react";

function App() {

  return (
    <Router>
      <Header />
      <Switch>
        <Container className='py-5' fluid >
          <Route path='/' exact component={Home} />
          <Route path='/admin' exact component={PizzaList} />
          <Route path='/pizzas/cart' exact component={Cart} />
        </Container>
      </Switch>
    </Router>
  );
}

export default App;
