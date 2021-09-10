import React, { useContext } from 'react'
import PizzasContext from '../contexts/pizzas/PizzasContext'
import CartContext from '../contexts/cart/CartContext'
import { Button } from 'react-bootstrap'
import CartItem from './CartItem'

const Cart = () => {
  const { allPizzas } = useContext(PizzasContext)
  const {
    API_PIZZAS_URL,
    cart,
    clearCart,
    checkOut
  } = useContext(CartContext)  


  return (
    <div className='Cart w-75 mx-auto'>
      <h4 className='bg-dark text-white p-2 text-center'>Your Cart</h4>
      {
        cart?.pizzas?.length === 0
        ? <p className='text-center'>Start adding items to your cart</p>
        : null
      }
      <div className='pizzas py-3'>
        {
          cart?.pizzas?.length > 0
          ? cart.pizzas.map(item =>
            <CartItem
              key={item.pizza}
              id={item.pizza}
              name={item.pizza.name}
              qty={item.qty}
              price={item.pizza.price}
              image={item.pizza.image}
          />)
          : null
        }
      </div>
      <div className='separator border border-secondary'></div>
      <div className='price py-3 '>
        <div className='d-flex justify-content-between'>
          <p>SubTotal</p>
          <p>$ {cart && cart.totalPrice || 0}</p>
        </div>
        {
          cart?.pizzas?.length > 0 
          ? <div className='d-flex justify-content-between text-muted'>
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
      <Button variant="success" className='success p-2 w-100' onClick={checkOut}>GO TO CHECKOUT</Button>
    </div>
  )
}

export default Cart
