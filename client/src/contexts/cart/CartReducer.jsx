import axios from "axios"

const API_URL = process.env.REACT_APP_API_CART_URL

const CartReducer = (state, action) => {
  const { cartID, pizza, cartItems, newCart } = action.payload

  switch(action.type){
    case 'CREATE_CART':
      return newCart
    case 'ADD_TO_CART':
      return { ...state, pizzas: cartItems};
    case 'REMOVE_FROM_CART':
      return state.pizzas.filter(item => item._id !== pizza._id)
    case 'DECREMENT_QUANTITY':
      return state.pizzas.find(item => item._id === pizza._id)?.quantity === 1
        ? state.pizzas.filter(item => item._id !== pizza._id)
        : state.pizzas.map(item => item._id === pizza._id
          ? {
             ...item,
             quantity: item.quantity - 1
            }
          : item)
    case 'CLEAR_CART':
      return []
    case 'CHECKOUT':
      return []
    default:
      return state;
  }
}

export default CartReducer
