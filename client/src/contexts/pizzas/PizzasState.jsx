import React, { useState, useEffect, useContext } from 'react'
import PizzasContext from './PizzasContext'
import axios from 'axios'
import CartContext from '../cart/CartContext'

const PizzasState = ({children}) => {
  const localPizzas = JSON.parse(localStorage.getItem('pizzas'))
  const [ allPizzas, setAllPizzas ] = useState(localPizzas || [])
  const [ editablePizzaId, setEditablePizzaId ] = useState()
  const { API_URL } = useContext(CartContext)

  const fetchedData = async () => {
    try {
      const res = await axios(`${API_URL}/pizzas`)
      const pizzas = await res.data
      setAllPizzas(pizzas)
      localStorage.setItem(
        'pizzas', JSON.stringify(pizzas)
      )
    } catch (err) {
      console.log(err)
    }
  }

  const createPizza = async newPizza => {
    try {
      const res = await axios.post(
        `${API_URL}/pizzas`,
        { ...newPizza }
      )
      const addedPizza = await res.data
      const pizzasCopy = [ ...allPizzas, addedPizza ]
      setAllPizzas(pizzasCopy)
    } catch (err) {
      console.log(err)
    }
  }

  const setPizzaInEditionMode = id => setEditablePizzaId(id)

  const updatePizza = async (id, pizzaData) => {
    try {
      const res = await axios.patch(
        `${API_URL}/pizzas/${id}`,
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
        `${API_URL}/pizzas/${id}`
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
    <PizzasContext.Provider value={{ API_URL, allPizzas, setAllPizzas, setPizzaInEditionMode, editablePizzaId, updatePizza, createPizza, deletePizza }}>
      {children}
    </PizzasContext.Provider>
  )
}

export default PizzasState
