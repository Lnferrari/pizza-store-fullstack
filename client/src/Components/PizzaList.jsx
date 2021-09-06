import React, { useContext } from 'react'
import pizzasContext from '../contexts/pizzas/PizzasContext'
import PizzaItem from './PizzaItem'

const PizzaList = () => {
  const { allPizzas } = useContext(pizzasContext)

  const pizzaListMarkUp = allPizzas.map(pizza => (
    <PizzaItem />
  ))

  return (
    <section className='pizzaList'>
      {pizzaListMarkUp}
    </section>
  )
}

export default PizzaList
