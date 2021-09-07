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

  const createPizza = async newPizza => {
    // const pizzasCopy = [...allPizzas, newPizza]
    // setAllPizzas(pizzasCopy)
    try {
      const res = await axios.post(
        'http://localhost:5000/pizzas',
        { ...newPizza }
      )
      fetchedData()
    } catch (err) {
      console.log(err)
    }
  }

  const setPizzaInEditionMode = id => setEditablePizzaId(id)

  const updatePizza = async (id, pizzaData) => {
    // const currentPizzas = allPizzas
    // currentPizzas.forEach((pizza, idx, array) => {
    //   if(pizza._id === id){
    //     array[idx].name = pizzaData.name
    //     array[idx].price = pizzaData.price
    //     array[idx].description = pizzaData.description
    //   }
    // })
    // setAllPizzas(currentPizzas)
    try {
      const res = await axios.patch(
        `http://localhost:5000/pizzas/${id}`,
        { ...pizzaData }
      )
      fetchedData()
    } catch (err) {
      console.log(err)
    }
  }

  const deletePizza = async id => {
    // const filteredPizzas = allPizzas.filter(pizza => (
    //   pizza._id !== id
    // ))
    // setAllPizzas(filteredPizzas)
    try {
      const response = await axios.delete(
        `http://localhost:5000/pizzas/${id}`
      )
      fetchedData()
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
