import React, { useState, useEffect } from 'react'
import PizzasContext from './PizzasContext'
import getAllPizzas from '../../helpers/getAllPizzas'
import axios from 'axios'

const PizzasState = ({children}) => {
  const [ allPizzas, setAllPizzas ] = useState([])
  const [ editablePizzaId, setEditablePizzaId ] = useState()

  const fetchedData = async () => {
    try {
      const res = await axios('http://localhost:5000/pizzas')
      const pizzas = await res.data
      setAllPizzas(pizzas)
    } catch (err) {
      console.log(err)
    }
  }

  const createPizza = async pizzaData => {
    try {
      const res = await axios.post(
        'http://localhost:5000/pizzas',
        { ...newPizza }
      )
      const newPizza = await res.data
      const pizzasCopy = [...allPizzas, newPizza]
      setAllPizzas(pizzasCopy)
    } catch (err) {
      console.log(err)
    }
  }

  const setPizzaInEditionMode = id => setEditablePizzaId(id)

  const updatePizza = async (id, pizzaData) => {
    try {
      const res = await axios.patch(
        `http://localhost:5000/pizzas/${id}`,
        { ...pizzaData }
      )
      const updatedPizza = await res.data
      const currentPizzas = allPizzas.map(pizza => (
        pizza._id === id ? pizzaData : pizza
      ))
      setAllPizzas(currentPizzas)
    } catch (err) {
      console.log(err)
    }
  }

  const deletePizza = async id => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/pizzas/${id}`
      )
      const remainingPizzas = allPizzas.filter(pizza => (
        pizza._id !== id
      ))
      setAllPizzas(remainingPizzas)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
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
