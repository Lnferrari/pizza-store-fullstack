import React, { useReducer, useEffect, useContext } from 'react'
import { useHistory } from 'react-router'
import CartContext from './CartContext'
import CartReducer from './CartReducer'
import PizzasContext from '../pizzas/PizzasContext'
import axios from 'axios'

const initialState = {
  pizzas: []
}

const CartState = ({children}) => {
  const localCart = JSON.parse(localStorage.getItem('cart'))
  const [ cart, dispatch ] = useReducer(CartReducer, localCart || initialState)
  const API_PIZZAS_URL = useContext(PizzasContext)

  const API_CART_URL = process.env.REACT_APP_API_CART_URL

  let history = useHistory()

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
    localStorage.setItem('cart',
      JSON.stringify( newCart )
    )
    } catch (err) {
      console.log(err)
    }
  }

  const addToCart = async (id) => {
    console.log('adding..', id)
    let updatedPizzas = []
    const existPizza = cart?.pizzas.find(
      item => item.pizza._id === id
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
    localStorage.setItem('cart',
      JSON.stringify( updatedCart )
    )
  }

  const decrementQty = async (id) => {
    console.log('decrementing..', id)
    console.log('CART PIZZAS =>', cart.pizzas)
    try {
      const pizzasCopy = cart?.pizzas.map(
        item => item.pizza._id === id
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
      localStorage.setItem('cart',
        JSON.stringify( updatedCart )
      )
    } catch (err) {
      console.log(err)
    }
  }

  const removeFromCart = async (id) => {
    try {
      const filteredPizzas = cart?.pizzas.filter(
        item => item.pizza._id !== id
        )
      const response = await axios.patch(
        `${API_CART_URL}/${cart._id}`,
        { pizzas: filteredPizzas }
      )
      const updatedCart = await response.data
      dispatch({
        type: 'REMOVE_PIZZA',
        payload: updatedCart
      })
      localStorage.setItem('cart',
        JSON.stringify( updatedCart )
      )
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
    localStorage.setItem('cart',
      JSON.stringify({
        ...cart,
        pizzas: []
      })
    )
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
    history.push("/")
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
      removeFromCart,
      clearCart,
      checkOut}}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartState
