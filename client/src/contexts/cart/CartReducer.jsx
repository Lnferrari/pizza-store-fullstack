import axios from "axios"

const API_URL = process.env.REACT_APP_API_CART_URL

const CartReducer = (state, action) => {
  const { payload } = action
  switch(action.type){
    case 'CREATE_CART':
      return payload
    case 'ADD_TO_CART':
      return payload
    case 'DECREMENT_QUANTITY':
      return payload
    case 'REMOVE_FROM_CART':
      return payload
    case 'CLEAR_CART':
      return payload
    case 'CHECKOUT':
      return payload
    default:
      return payload;
  }
}

export default CartReducer
