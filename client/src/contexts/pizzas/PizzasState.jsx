import React, { useState, useEffect } from 'react'
import PizzasContext from './PizzasContext'
import getAllPizzas from '../../helpers/getAllPizzas'

const PizzasState = ({children}) => {
  const [allPizzas, setAllPizzas] = useState([])
  const [ editablePizzaId, setEditablePizzaId ] = useState()

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
    const filteredPizzas = allPizzas.filter(pizza => (
      pizza._id !== id
    ))
    setAllPizzas(filteredPizzas)
  }

  useEffect(() => {
    const fetchedData = async () => {
      const pizzas = await getAllPizzas()
      setAllPizzas(pizzas)
    }
    fetchedData()
    setPizzaInEditionMode(null)
  }, [])

  return (
    <PizzasContext.Provider value={{ allPizzas, setAllPizzas, setPizzaInEditionMode, editablePizzaId, updatePizza, deletePizza }}>
      {children}
    </PizzasContext.Provider>
  )
}

export default PizzasState
