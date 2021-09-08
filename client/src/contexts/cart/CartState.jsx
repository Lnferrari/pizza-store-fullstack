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
  const [ totalPrice, setTotalPrice ] = useState(0)
  console.log('CART =>', cart)
  const API_URL = process.env.REACT_APP_API_CART_URL
  
  // const getCart = async () => {
  //   const response = await axios.get(API_URL)
  //   const cart = await response.data
  //   return cart
  // }

  const createCart = async (pizza) => {
    try {
      const response = await axios.post(
        API_URL,
        initialState
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

  const addToCart = async id => {
    try {
      const cartItems = cart.pizzas.slice()
      console.log(cartItems)
      let alreadyExists = false
      cartItems.forEach(item => {
        if (item._id === id) {
          alreadyExists = true
          item.quantity++
        }
      })
      if (!alreadyExists) {
        cartItems.push({
          id,
          quantity: 1
        })
      }
      dispatch({
        type: 'ADD_TO_CART',
        payload: cartItems
      })
      console.log(cart._id)
      const response = await axios.patch(
        `${API_URL}/${cart._id}`,
        cartItems
      )
      const updatedCart = await response.data
      
      // setCart(updatedCart)
    } catch (err) {
      console.log(err)
    }
  }

  const decrementItemQuantity = async id => {
    // state.pizzas.find(item => item._id === pizza._id)?.quantity === 1
    //     ? state.pizzas.filter(item => item._id !== pizza._id)
    //     : state.pizzas.map(item => item._id === pizza._id
    //       ? {
    //          ...item,
    //          quantity: item.quantity - 1
    //         }
    //       : item)
    // dispatch({
    //   type: 'DECREMENT_QUANTITY', 
    //   payload: {
    //     cartID: cart._id,
    //     pizza: pizza
    //   }
    // })
    try {
      const cartItems = cart.pizzas.slice()
      cartItems.forEach(item => {
        if (item._id === id)
          item.quantity--
      })
      const response = await axios.patch(
        `${API_URL}/${cart._id}`,
        cartItems
      )
      const updatedCart = await response.data
      // setCart(updatedCart)
      dispatch({
        type: 'DECREMENT_QUANTITY',
        payload: {
          cartID: cart._id,
          updatedCart
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  const removeFromCart = async id => {
    // dispatch({
    //   type: 'REMOVE_FROM_CART',
    //   payload: {
    //     cartID: cart._id,
    //     pizza: pizza
    //   }
    // })
    try {
      const cartItems = cart.pizzas.filter(
        item => item._id === id
      )
      const response = await axios.patch(
        `${API_URL}/${cart._id}`,
        cartItems
      )
      const updatedCart = await response.data
      // setCart(updatedCart)
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
    // dispatch({
    //   type: 'CLEAR_CART',
    //   payload: {
    //     cartID: cart._id
    //   }
    // })
  }

  const checkOut = async () => {
    // dispatch({
    //   type: 'CHECKOUT',
    //   payload: {
    //     cartID: cart._id
    //   }
    // })

    alert('GRACIAS POR SU COMPRA')
  }

  const getTotalPrice = () => {
    const total = cart?.pizzas?.reduce((total, pizza) => {
      total += pizza
      return total
    }, 0)
    setTotalPrice(total)
  }

  useEffect(async () => {
    cart && getTotalPrice()
  }, [cart])

  useEffect(() => {
    createCart()
  }, [])

  return (
    <CartContext.Provider value={{
      cart,
      totalPrice,
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
