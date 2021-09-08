import React from 'react'
import { Row, Col } from 'react-bootstrap'
import PizzaList from './PizzaList'
import Cart from './Cart'

const Home = () => {
  return (
    <Row className='mx-auto' >
      <Col xl={8} md={8} className='home_pizzaList mx-auto'>
        <PizzaList />
      </Col>
      <Col xl={4} md={4} className=''>
        <Cart />
      </Col>
    </Row>
  )
}

export default Home
