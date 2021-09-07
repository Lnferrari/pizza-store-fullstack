import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router'
import PizzasContext from '../contexts/pizzas/PizzasContext'
import PizzaItem from './PizzaItem'
import { Col, Row } from 'react-bootstrap'
import SearchContext from '../contexts/search/SearchContext'

const PizzaList = () => {
  const [ editablePizzaId, setEditablePizzaId] = useState()
  const { allPizzas, setAllPizzas } = useContext(PizzasContext)
  const { searchQuery } = useContext(SearchContext)
  const { pathname } = useLocation()

  const setPizzaInEditionMode = id => setEditablePizzaId(id)

  const updatePizza = (id, pizzaData) => {
    const currentPizzas = allPizzas
    currentPizzas.forEach((pizza, idx, array) => {
      if(pizza._id === id){
        array[idx].name = pizzaData.name
        array[idx].price = pizzaData.price
        array[idx].description = pizzaData.description
      }
    })
    setAllPizzas(currentPizzas)
  }

  const deletePizza = id => {
    console.log(id)
    const filteredPizzas = allPizzas.filter(pizza => (
      pizza._id !== id
    ))
    setAllPizzas(filteredPizzas)
  }

  useEffect(() => {
    setPizzaInEditionMode(null)
  }, [])

  const pizzaListMarkUp = allPizzas && allPizzas
    .filter(pizza => (
      pizza.name.toLowerCase().includes(searchQuery)
    ))
    .map(pizza => (
      <PizzaItem
        key={pizza._id}
        pizzaData={pizza}
        editablePizzaId={editablePizzaId}
        setPizzaInEditionMode={setPizzaInEditionMode}
        updatePizza={updatePizza}
        onDelete={deletePizza}
      />
    ))

  return (
    <Row className={`${pathname.startsWith('/admin') ? 'w-75' : ''} mx-auto`}>
      { pizzaListMarkUp }
    </Row>
  )
}

export default PizzaList
