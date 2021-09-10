import React, {
  useReducer,
  useEffect,
  useContext
} from 'react'
import CartContext from './CartContext'
import CartReducer from './CartReducer'
import axios from 'axios'

const initialState = {
  pizzas: []
}

const CartState = ({children}) => {
  const localCart = JSON.parse(localStorage.getItem('cart'))
  const [ cart, dispatch ] = useReducer(CartReducer, localCart || {})


  const API_PIZZAS_URL = process.env.REACT_APP_API_PIZZAS_URL
  const API_CART_URL = process.env.REACT_APP_API_CART_URL


  // const getCart = async () => {
  //   const response = await axios.get(
  //     `${API_CART_URL}/613a8c6be91bc862c601f9d2`
  //   )
  //   const cart = await response.data
  //   dispatch({
  //     type: 'CREATE_CART',
  //     payload: cart
  //   })
  // }

  // const getPizzaInfo = (id) => {
  //   const data = allPizzas.find(
  //     pizza => pizza._id === id
  //   )
  //   console.log('PIZZA INFORMATION =>', pizzaInfo)
  //   return data
  // }

  const createCart = async () => {
    try {
      const response = await axios.post(
        API_CART_URL,
        { pizzas: [] }
      )
      const newCart = await response.data
      console.log('NEW CART! =>', newCart)
      dispatch({
        type: 'CREATE_CART',
        payload: newCart
      })
    localStorage.setItem('cart', JSON.stringify(newCart))
    } catch (err) {
      console.log(err)
    }
  }

  const addToCart = async pizzaId => {
    console.log('adding.. pizza ID ', pizzaId)
    let updatedPizzas = []
    const existPizza = cart?.pizzas?.find(
      item => item.pizza === pizzaId
    )
    if (existPizza) {
      console.log('existpizza!', existPizza)
      updatedPizzas = cart.pizzas.map(item =>
        item.pizza === existPizza.pizza
        ? {
          ...item,
          quantity: item.quantity + 1
        }
        : item)
    } else {
      updatedPizzas = [
        ...cart.pizzas,
        { pizza: pizzaId , quantity: 1 }
      ]
    }
    console.log('UPDATED PIZZAS', updatedPizzas)
    // const response = await axios.patch(
    //   `${API_CART_URL}/${cart._id}`,
    //   { pizzas: [...updatedPizzas] }
    // )
    // const updatedCart = await response.data
    dispatch({
      type: 'ADD_TO_CART',
      payload: updatedPizzas
    })
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  // const decrementQuantity = async id => {
  //   try {
  //     // const pizzaItem = cart.pizzas.find(
  //     //   p => p.pizza._id === id
  //     // )
  //     // pizza.quantity > 1
  //     // ? pizzaItem.quantity--
  //     // : 
  //     // } else {
  //     //   cartCopy.push({
  //     //     pizza: id,
  //     //     quantity: 1
  //     //   })
  //     // }
  //     const cartCopy = cart.pizzas.slice()
  //     cartCopy.forEach(p => {
  //       if (p.pizza._id === id) {
  //         p.quantity--
  //       }
  //     })
  //     const response = await axios.patch(
  //       `${API_CART_URL}/${cart._id}`,
  //       { pizzas: cartCopy }
  //     )
  //     const updatedCart = await response.data
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  const removePizza = async id => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: id
    })

    localStorage.setItem('cart', JSON.stringify(cart.pizzas))
  }

  const clearCart = async () => {
    try {
      // const response = await axios.patch(
      //   `${API_CART_URL}/${cart._id}`,
      //   { pizzas: [] }
      // )
      // const emptyCart = await response.data
      dispatch({
        type: 'CLEAR_CART'
      })
    } catch (err) {
      console.log(err);
    }
    localStorage.setItem('cart', JSON.stringify([]))
  }

  const checkOut = () => {
    // try {
    //   const response = await axios.patch(
    //     `${API_CART_URL}/${cart._id}`,
    //     { pizzas: [] }
    //   )
    dispatch({
      type: 'CHECKOUT'
    })
    alert('GRACIAS POR SU COMPRA')
    localStorage.removeItem('cart')
    // } catch (err) {
    //   console.log(err);
    // }
  }

  const testDB = async () => {
    if (cart?.pizzas.length !== 0) {
      await axios.patch(
        `${API_CART_URL}/${cart._id}`,
        { pizzas: [...cart.pizzas] }
      )
    }
  }

  useEffect(() => {
    testDB()
  }, [cart])

  useEffect(() => {
    if (!cart._id) {
      createCart()
    }
  })

  return (
    <CartContext.Provider value={{
      API_PIZZAS_URL,
      cart,
      createCart,
      addToCart,
      removePizza,
      clearCart,
      checkOut}}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartState
