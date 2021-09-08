import React, {
  useState,
  useEffect,
  useContext
} from 'react'
import CartReducer from './CartReducer'
import CartContext from './CartContext'
import { useReducer } from 'react'
import axios from 'axios'

let currentCart

const CartState = ({children}) => {
  const initialState = {
    pizzas: []
  }
  const [ cart, dispatch ] = useReducer(CartReducer, initialState)

  const cartID = '6138b685944464de64d36989'
  const API_URL = process.env.REACT_APP_API_CART_URL
  
  const getCart = async () => {
    const response = await axios.get(API_URL)
    const cart = await response.data
    return cart
  }

  const createCart = async () => {
    try {
      const response = await axios.post(
        API_URL,
        cart
      )
      const newCart = await response.data
      dispatch({
        type: 'CREATE_CART',
        payload: newCart
      })
    } catch (err) {
      console.log(err)
    }
    
  }

  const addToCart = async pizza => {
    const cartItems = cart.pizzas.slice()
    let alreadyExists = false
    cartItems.forEach(item => {
      if (item._id === pizza._id) {
        alreadyExists = true
        item.quantity++
      }
    })
    if (!alreadyExists) cartItems.push({
      ...pizza,
      quantity: 1
    })
    dispatch({
      type: 'ADD_TO_CART',
      payload: {
        cartID,
        cartItems
      }
    })
    const response = await axios.patch(
      API_URL,
      cartItems
    )
    const updatedCart = await response.data
    console.log(updatedCart)
  }

  const decrementItemQuantity = pizza => {
    dispatch({
      type: 'DECREMENT_QUANTITY', 
      payload: {
        cartID: cart._id,
        pizza: pizza
      }
    })
  }

  const removeFromCart = pizza => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: {
        cartID: cart._id,
        pizza: pizza
      }
    })
  }

  const clearCart = () => {
    dispatch({
      type: 'CLEAR_CART',
      payload: {
        cartID: cart._id
      }
    })
  }

  const checkOut = () => {
    dispatch({
      type: 'CHECKOUT',
      payload: {
        cartID: cart._id
      }
    })
  }

  // useEffect(async () => {
  //   currentCart = await getCart()
  //   console.log(currentCart)
  // }, [])

  return (
    <CartContext.Provider value={{
      cart,
      createCart,
      addToCart,
      decrementItemQuantity,
      removeFromCart,
      clearCart,
      checkOut}}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartState
