import axios from "axios"
import { NavItem } from "react-bootstrap"

const API_URL = process.env.REACT_APP_API_CART_URL

const CartReducer = (state, action) => {
  console.log('A.P =>', action.payload)

  switch(action.type){
    case 'CREATE_CART':
      return {
        ...state,
        ...action.payload
      }
    case 'ADD_TO_CART':
      console.log('FINAL RESULT =>', {
        ...state,
        pizzas: action.payload
      })
      console.log(state)
      return {
        ...state,
        pizzas: action.payload
      }
    case 'DECREMENT_QUANTITY':
      const currentPizza = state.find(pizza => 
        pizza.pizza._id === action.payload)
      if (currentPizza?.quantity === 1) {
        return state.filter(pizza => 
          pizza.pizza._id !== action.payload
        )
      } else {
        return state.map(pizza =>
          pizza.pizza.id === action.payload
          ? {
             ...currentPizza,
             quantity: pizza.quantity - 1
          }
          : pizza)
        }
    case 'REMOVE_FROM_CART':
      console.log('removing...', action.payload)
      return {
        ...state,
        pizzas: state.pizzas.filter(p =>
          p._id !== action.payload
        )
      }
    case 'CLEAR_CART':
      return {
        ...state,
        pizzas: []
      }
    case 'CHECKOUT':
      return {
        pizzas: []
      }
    default:
      return state;
  }
}

export default CartReducer
