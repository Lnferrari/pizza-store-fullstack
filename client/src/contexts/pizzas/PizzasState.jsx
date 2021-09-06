import React, { useState, useEffect } from 'react'
import PizzasContext from './PizzasContext'
import getAllPizzas from '../../helpers/getAllPizzas'

const PizzasState = ({children}) => {
  const [allPizzas, setAllPizzas] = useState([])


  useEffect(() => {
    const fetchedData = async () => {
      const pizzas = await getAllPizzas()
      setAllPizzas(pizzas)
    }
    fetchedData()  
  }, [])

  return (
    <PizzasContext.Provider value={{ allPizzas, setAllPizzas }}>
      {children}
    </PizzasContext.Provider>
  )
}

export default PizzasState
