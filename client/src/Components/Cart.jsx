import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import PizzasContext from '../contexts/pizzas/PizzasContext'
import CartContext from '../contexts/cart/CartContext'
import { Button } from 'react-bootstrap'
import CartItem from './CartItem'

const Cart = () => {
  const { allPizzas } = useContext(PizzasContext)
  const {
    cart,
    clearCart,
    checkOut
  } = useContext(CartContext)  

  const { pathname } = useLocation()

  return (
    <div className={`${pathname.endsWith('/cart') ? 'w-50' : 'w-75'} Cart mx-auto`}>
      <Link to='/cart'
        className='text-decoration-none'
      >
        <h4 className='bg-danger text-white p-2 text-center'>Your Cart</h4>
      </Link>
      {
        cart?.pizzas?.length === 0
        ? <p className='text-center py-2'>Start adding items to your cart</p>
        : null
      }
      <div className='pizzas py-3'>
        {
          cart?.pizzas?.length > 0
          ? cart.pizzas.map(item =>
            <CartItem
              key={item.pizza._id}
              id={item.pizza._id}
              name={item.pizza.name}
              qty={item.qty}
              price={item.pizza.price}
              image={item.pizza.image}
          />)
          : null
        }
      </div>
      <div className='separator border border-secondary'></div>
      <div className='price py-3'>
        <div className='d-flex justify-content-between fw-light'>
          <p>SubTotal</p>
          <p>$ {cart && cart.totalPrice || 0}</p>
        </div>
        {
          cart?.pizzas?.length > 0 
          ? <div className='d-flex justify-content-between text-muted fw-light'>
              <p>Delivery fee</p>
              <p className='text-danger'>Free</p>
            </div>
          : null
        }
        <div className='d-flex justify-content-between fw-bold'>
          <p>Total</p>
          <p>$ {cart?.totalPrice || 0}</p>
        </div>
      </div>
      <Button variant="success"
        className='success p-2 w-100'
        onClick={checkOut}
      >
        GO TO CHECKOUT
      </Button>
    </div>
  )
}

export default Cart
