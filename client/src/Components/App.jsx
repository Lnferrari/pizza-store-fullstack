import { Container } from "react-bootstrap";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Header from './Header'
import Home from "./Home";
import PizzaList from "./PizzaList";
import Cart from './Cart'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'

function App() {

  return (
    <Router>
      <Header />
      <main className=''>
        <Switch>
          <Container className='py-5' fluid >
            <Route path='/' exact component={Home} />
            <Route path='/cart' exact component={Cart} />
            <Route path='/admin' exact component={PizzaList} />
          </Container>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
