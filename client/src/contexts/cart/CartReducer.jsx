import axios from "axios"

const API_URL = process.env.REACT_APP_API_CART_URL

const CartReducer = (state, action) => {
  const { cartID, pizza, cartItems, newCart } = action.payload
  switch(action.type){
    case 'CREATE_CART':
      console.log('creating...')
      return action.payload
    case 'ADD_TO_CART':
      console.log('adding...')
      return { ...state, pizzas: [...cartItems]};
    case 'REMOVE_FROM_CART':
      return state.pizzas.filter(item => item._id !== pizza._id)
    case 'DECREMENT_QUANTITY':
      return []
    case 'CLEAR_CART':
      return []
    case 'CHECKOUT':
      return []
    default:
      return state;
  }
}

export default CartReducer
