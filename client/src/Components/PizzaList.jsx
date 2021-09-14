import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router'
import PizzasContext from '../contexts/pizzas/PizzasContext'
import PizzaItem from './PizzaItem'
import { Form, Row, Col, Button } from 'react-bootstrap'
import SearchContext from '../contexts/search/SearchContext'
import axios from 'axios'

const initialPizzaState = {
  name: '',
  price: '',
  description: ''
}

const PizzaList = () => {
  const [ newPizza, setNewPizza ] = useState(initialPizzaState)
  const { allPizzas, setAllPizzas, createPizza, API_PIZZAS_URL } = useContext(PizzasContext)
  const { searchQuery } = useContext(SearchContext)
  const { pathname } = useLocation()


  const inputHandler = e => {
    setNewPizza({
      ...newPizza,
      [e.target.name]: e.target.value
    })
  }

  const createPizzaHandler = async (e) => {
    e.preventDefault()
    createPizza(newPizza)
    setNewPizza(initialPizzaState)
  }

  const pizzaListMarkUp = allPizzas && allPizzas
    .filter(pizza => (
      pizza.name.toLowerCase().includes(searchQuery)
    ))
    .map(pizza => (
      <PizzaItem
        key={pizza._id}
        id={pizza._id}
        name={pizza.name}
        price={pizza.price}
        image={pizza.image}
        description={pizza.description}
      />
    ))

  const newPizzaForm = (
    <Form className='pizzaCard mx-auto mb-5 p-4 w-75' onSubmit={createPizzaHandler}>
      <Row>
        <Col md={9}>
          <Form.Control
            name='name'
            value={newPizza.name}
            onChange={inputHandler}
            placeholder='Name'
            required
          />
        </Col>
        <Col md={3}>
          <Form.Control
            name='price'
            value={newPizza.price}
            onChange={inputHandler}
            placeholder='$ Price'
            required
          />
        </Col>
      </Row>
        <Col className='py-2'>
          <Form.Control
            name='description'
            as="textarea"
            value={newPizza.description}
            onChange={inputHandler}
            placeholder={`Pizza's description...`}
            rows={5}
            required
          >
          </Form.Control>
      </Col>
      <Row>
        <Col>
          <Button
            variant="outline-success"
            className='w-100'
            onClick={createPizzaHandler}
          >
            CREATE
          </Button>
        </Col>
      </Row>
    </Form>
  )

  return (
    <Row className={`${pathname.endsWith('/admin') ? 'w-100' : ''} mx-auto`}>
      {
        pathname.endsWith('/admin')
        ? <Col className='mx-auto' xl={4} >{newPizzaForm}</Col>
        : null
      }
      { pizzaListMarkUp }
    </Row>
  )
}

export default PizzaList
