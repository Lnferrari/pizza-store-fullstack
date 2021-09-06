import React, { useState, useEffect, useContext } from 'react'
import PizzasContext from './PizzasContext'
import getAllPizzas from '../../helpers/getAllPizzas'

const PizzasState = ({children}) => {
  const [allPizzas, setAllPizzas] = useState()


  useEffect(() => {
    const fetchedData = getAllPizzas()
    setAllPizzas(fetchedData)
  })
  return (
    <PizzasContext.Provider value={allPizzas}>
      {children}
    </PizzasContext.Provider>
  )
}

export default PizzasState
