import React, { useContext } from 'react'
import PizzasContext from '../contexts/pizzas/PizzasContext'
import PizzaItem from './PizzaItem'
import Row from 'react-bootstrap/Row'
import { Col, Container } from 'react-bootstrap'
import SearchContext from '../contexts/search/SearchContext'

const PizzaList = () => {
  const { allPizzas } = useContext(PizzasContext)
  const { searchQuery } = useContext(SearchContext)

  const pizzaListMarkUp = allPizzas && allPizzas
    .filter(pizza => (
      pizza.name.toLowerCase().includes(searchQuery)
    ))
    .map(pizza => (
      <PizzaItem key={pizza.id} data={pizza} />
    ))

  return (
    <Row className='py-5'>
      <Col xl={9} m={8} className='pizzaList'>
        <Row className='mx-auto'>{ pizzaListMarkUp }</Row>
      </Col>
      <Col xl={3} className=''>
        <div className=' h-100'>
          CART
        </div>
      </Col>
    </Row>
  )
}

export default PizzaList
