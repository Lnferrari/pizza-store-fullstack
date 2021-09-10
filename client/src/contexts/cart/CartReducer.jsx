const CartReducer = (state, action) => {

  switch(action.type){
    case 'CREATE_CART':
      return {
        ...state,
        ...action.payload
      }
    case 'ADD_PIZZA':
      return {
        ...state,
        ...action.payload
      }
    case 'DECREMENT_QTY':
      return {
        ...state,
        ...action.payload
      }
    case 'REMOVE_PIZZA':
      return {
        ...state,
        ...action.payload
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
