import React, {
  useState,
  useEffect,
  useContext
} from 'react'
import CartReducer from './CartReducer'
import CartContext from './CartContext'
import { useReducer } from 'react'
import axios from 'axios'

const initialState = {
  pizzas: []
}

const CartState = ({children}) => {
  const [ cart, dispatch ] = useReducer(CartReducer, initialState)
  console.log('CART =>', cart)
  const API_URL = process.env.REACT_APP_API_CART_URL

  // const getCart = async () => {
  //   const response = await axios.get(API_URL)
  //   const cart = await response.data
  //   return cart
  // }

  const createCart = async id => {
    try {
      const response = await axios.post(
        API_URL,
        {
          pizzas: [ { 
            pizza: id,
            quantity: 1
          } ]
        }
      )
      const newCart = await response.data
      // setCart(newCart)
      console.log('CART CREATED! =>', newCart)
      dispatch({
        type: 'CREATE_CART',
        payload: newCart
      })
    } catch (err) {
      console.log(err)
    }
  }

  const addPizza = async id => {
    console.log('CART pizzas =>', cart.pizzas)
    try {
      const cartPizzas = cart.pizzas.slice()
      let alreadyExists = false
      cartPizzas.forEach(p => {
        if (p.pizza._id === id) {
          alreadyExists = true;
          p.quantity++
        }
      })
      if (!alreadyExists) {
        cartPizzas.push({
          pizza: id,
          quantity: 1
        })
      }
      console.log('cart id =>', cart._id)
      const response = await axios.patch(
        `${API_URL}/${cart._id}`,
        { pizzas: cartPizzas }
      )
      const updatedCart = await response.data
      dispatch({
        type: 'ADD_TO_CART',
        payload: updatedCart
      })
    } catch (err) {
      console.log(err)
    }
  }

  const decrementQuantity = async id => {
    try {
      const cartPizzas = cart.pizzas.slice()
      cartPizzas.forEach(p => {
        if (p.pizza._id === id) {
          p.quantity--
        }
      })
      const response = await axios.patch(
        `${API_URL}/${cart._id}`,
        { pizzas: cartPizzas }
      )
      const updatedCart = await response.data
      dispatch({
        type: 'DECREMENT_QUANTITY',
        payload: updatedCart
      })
    } catch (err) {
      console.log(err)
    }
  }

  const removePizza = async id => {
    try {
      const cartPizzas = cart.pizzas.filter(
        p => p.pizza._id === id
      )
      const response = await axios.patch(
        `${API_URL}/${cart._id}`,
        { pizzas: cartPizzas }
      )
      const updatedCart = await response.data
      dispatch({
        type: 'REMOVE_FROM_CART',
        payload: updatedCart
        }
      )
    } catch (err) {
      console.log(err)
    }
  }

  const clearCart = async () => {
    try {
      const emptyCart = await axios.patch(
        `${API_URL}/${cart._id}`,
        { pizzas: [] }
      )
      dispatch({
        type: 'CLEAR_CART',
        payload: emptyCart
      })
    } catch (err) {
      console.log(err);
    }
  }

  const checkOut = async () => {
    try {
      const emptyCart = await axios.patch(
        `${API_URL}/${cart._id}`,
        { pizzas: [] }
      )
      dispatch({
        type: 'CLEAR_CART',
        payload: emptyCart
      })
    } catch (err) {
      console.log(err);
    }
    alert('GRACIAS POR SU COMPRA')
  }

  return (
    <CartContext.Provider value={{
      cart,
      createCart,
      addPizza,
      decrementQuantity,
      removePizza,
      clearCart,
      checkOut}}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartState
