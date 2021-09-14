import React from 'react'
import { Row, Col } from 'react-bootstrap'
import PizzaList from './PizzaList'
import Cart from './Cart'

const Home = () => {
  return (
    <Row className='mx-auto' >
      <Col xxl={9} md={7} sm={12} className='home_pizzaList mx-auto'>
        <PizzaList />
      </Col>
      <Col xxl={3} md={5}>
        <Cart />
      </Col>
    </Row>
  )
}

export default Home
