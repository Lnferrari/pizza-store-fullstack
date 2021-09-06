import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import PizzasState from "../contexts/pizzas/PizzasState";
import Header from './Header'
import PizzaList from "./PizzaList";
import '../App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  
  return (
    <Router>
      <Header />
      <Switch>
        <Container className='App' fluid >
          {/* <Route path='/cart' exact component={Cart} /> */}
          <Route path='/' component={PizzaList} />
        </Container>
      </Switch>
    </Router>
  );
}

export default App;
