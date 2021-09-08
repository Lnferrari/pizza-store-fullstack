import React, { useContext, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import CartContext from '../contexts/cart/CartContext'
import { HiOutlineMinusSm as Minus, HiOutlinePlusSm as Add } from 'react-icons/hi'
import { IoTrashOutline as Remove } from 'react-icons/io5'

const Cart = () => {
  const {
    cart,
    totalPrice,
    addToCart,
    decrementItemQuantity,
    removeFromCart,
    clearCart,
    checkOut
  } = useContext(CartContext)
  console.log('HERE IS THE CART', cart)

  

  return (
    <div className='Cart w-75 mx-auto'>
      <h4 className='bg-dark text-white p-2 text-center'>Your Cart</h4>
      {/* {
        cart && cart.pizzas.length === 0
        ? <p>Start adding items to your cart</p>
        : null
      } */}
      <div className='pizzas py-3'>
        {
          cart && cart?.pizzas?.length > 0
          ? cart.pizzas.map(pizza => (
              <div className='cart_item_container d-flex flex-column'>
                <div className='d-flex justify-content-between'>
                  <div>{pizza.name}</div>
                  <div className=''>$ {pizza.quantity * pizza.price}</div>
                </div>
                <div className='cart_item_quantity align-self-end'>
                  {
                    pizza.quantity === 1
                    ? <Remove />
                    : <Minus />
                  }
                  <div>{pizza.quantity}</div>
                  <Add />
                </div>
              </div>
            ))
          : null
        }
      </div>
      <div className='separator border border-secondary'></div>
      <div className='price py-3 '>
        <div className='d-flex justify-content-between'>
          <p>SubTotal</p>
          <p>$ {totalPrice}</p>
        </div>
        {
          cart && cart?.pizzas?.length > 0 
          ? <div className='d-flex justify-content-between text-muted'>
              <p>Delivery fee</p>
              <p className='text-danger'>Free</p>
            </div>
          : null
        }
        <div className='d-flex justify-content-between fw-bold'>
          <p>Total</p>
          <p>$ {totalPrice}</p>
        </div>
      </div>
      <Button variant="success" className='success p-2 w-100' onClick={checkOut}>GO TO CHECKOUT</Button>
    </div>
  )
}

export default Cart
