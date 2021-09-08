import React, { useContext } from 'react'
import CartContext from '../contexts/cart/CartContext'

const Cart = () => {
  const {
    cart,
    addToCart,
    decrementItemQuantity,
    removeFromCart,
    clearCart,
    checkOut
  } = useContext(CartContext)
  console.log('HERE IS THE CART', cart)
  return (
    <div className='Cart'>
      <h2>Your Cart</h2>
      {/* {
        cart && cart.pizzas.length === 0
        ? <p>Start adding items to your cart</p>
        : null
      } */}
      <div className='pizzas'>
        {
          cart && cart.pizzas.length > 0
          ? cart.pizzas.map(pizza => (
              <div className='cart_item_container'>
                <div>
                  <div>{pizza.name}</div>
                  <div>{pizza.subTotal}</div>
                </div>
                <div className='cart_item_quantity'>{pizza.quantity}</div>
              </div>
            ))
          : null
        }
      </div>
      <div className='price'>
        <div>
          <p>SubTotal</p>
          <p>$ {cart.totalPrice || 0}</p>
        </div>
        <div>
          <p>Delivery fee</p>
          <p>Free</p>
        </div>
        <div>
          <p>Total</p>
          <p>$ {cart.totalPrice || 0}</p>
        </div>
      </div>
      <button onClick={checkOut}>GO TO CHECKOUT</button>
    </div>
  )
}

export default Cart
