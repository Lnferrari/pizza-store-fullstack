import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router'
import PizzasContext from '../contexts/pizzas/PizzasContext'
import PizzaItem from './PizzaItem'
import { Col, Row } from 'react-bootstrap'
import SearchContext from '../contexts/search/SearchContext'

const PizzaList = () => {
  const { allPizzas, setAllPizzas } = useContext(PizzasContext)
  const { searchQuery } = useContext(SearchContext)
  const { pathname } = useLocation()


  const pizzaListMarkUp = allPizzas && allPizzas
    .filter(pizza => (
      pizza.name.toLowerCase().includes(searchQuery)
    ))
    .map(pizza => (
      <PizzaItem
        key={pizza._id}
        pizzaData={pizza}
      />
    ))

  return (
    <Row className={`${pathname.startsWith('/admin') ? 'w-75' : ''} mx-auto`}>
      { pizzaListMarkUp }
    </Row>
  )
}

export default PizzaList
