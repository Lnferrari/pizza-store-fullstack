import React from 'react'
import { Row, Col } from 'react-bootstrap'
import PizzaList from './PizzaList'

const Home = () => {
  return (
    <Row className='mx-auto' >
      <Col xl={9} md={8} className='home_pizzaList mx-auto'>
        <PizzaList />
      </Col>
      <Col xl={3} md={4} className=''>
        <div className=' h-100'>
          CART
        </div>
      </Col>
    </Row>
  )
}

export default Home
