import React, { useReducer, useEffect} from 'react'
import CartContext from './CartContext'
import CartReducer from './CartReducer'
import axios from 'axios'

const initialState = {
  pizzas: []
}

const CartState = ({children}) => {
  const localCart = JSON.parse(localStorage.getItem('cart'))
  const [ cart, dispatch ] = useReducer(CartReducer, localCart || initialState)


  const API_PIZZAS_URL = process.env.REACT_APP_API_PIZZAS_URL
  const API_CART_URL = process.env.REACT_APP_API_CART_URL


  const createCart = async () => {
    try {
      const response = await axios.post(
        API_CART_URL,
        { pizzas: [] }
      )
      const newCart = await response.data
      dispatch({
        type: 'CREATE_CART',
        payload: newCart
      })
    localStorage.setItem('cart', JSON.stringify(newCart))
    } catch (err) {
      console.log(err)
    }
  }

  const addToCart = async (id) => {
    let updatedPizzas = []
    const existPizza = cart?.pizzas.find(
      item => item.pizza === id
    )
    if (existPizza) {
      updatedPizzas = cart.pizzas.map(item =>
        item.pizza === existPizza.pizza
        ? {
          ...item,
          qty: item.qty + 1
        }
        : item)
    } else {
      updatedPizzas = [
        ...cart.pizzas,
        { pizza: id , qty: 1 }
      ]
    }
    const response = await axios.patch(
      `${API_CART_URL}/${cart._id}`,
      { pizzas: updatedPizzas }
    )
    const updatedCart = await response.data
    dispatch({
      type: 'ADD_PIZZA',
      payload: updatedCart
    })
    localStorage.setItem('cart', JSON.stringify(updatedCart))
  }

  const decrementQty = async (id) => {
    try {
      const pizzasCopy = cart?.pizzas.map(
        item => item.pizza === id
        ? {
          ...item,
          qty: item.qty - 1
        }
        : item
      )
      const response = await axios.patch(
        `${API_CART_URL}/${cart._id}`,
        { pizzas: pizzasCopy }
      )
      const updatedCart = await response.data
      dispatch({
        type: 'DECREMENT_QTY',
        payload: updatedCart
      })
      localStorage.setItem('cart', JSON.stringify(updatedCart))
    } catch (err) {
      console.log(err)
    }
  }

  const removePizza = async (id) => {
    try {
      const filteredPizzas = cart?.pizzas.filter(
        item => item.pizza !== id
        )
        const response = await axios.patch(
          `${API_CART_URL}/${cart._id}`,
          { pizzas: filteredPizzas }
          )
      dispatch({
        type: 'REMOVE_PIZZA',
        payload: filteredPizzas
      })
      localStorage.setItem('cart', JSON.stringify({ ...cart, pizzas: filteredPizzas }))
    } catch (err) {
      
    }
  }

  const clearCart = async () => {
    try {
      const response = await axios.patch(
        `${API_CART_URL}/${cart._id}`,
        { pizzas: [] }
      )
      const emptyCart = await response.data
      dispatch({
        type: 'CLEAR_CART'
      })
    } catch (err) {
      console.log(err);
    }
    localStorage.setItem('cart', JSON.stringify({ ...cart, pizzas: [] }))
  }

  const checkOut = async () => {
    try {
      const response = await axios.delete(
        `${API_CART_URL}/${cart._id}`
      )
      const checkout = await response.data
      console.log('CHECKOUT=>', checkout)
    dispatch({
      type: 'CHECKOUT',
      payload: checkout
    })
    alert('GRACIAS POR SU COMPRA')
    localStorage.removeItem('cart')
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    if (!cart._id) {
      createCart()
    }
  }, [])

  return (
    <CartContext.Provider value={{
      API_PIZZAS_URL,
      cart,
      createCart,
      addToCart,
      decrementQty,
      removePizza,
      clearCart,
      checkOut}}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartState
