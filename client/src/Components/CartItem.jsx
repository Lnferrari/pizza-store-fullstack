import React, { useState, useEffect, useContext } from 'react'
import CartContext from '../contexts/cart/CartContext'
import PizzasContext from '../contexts/pizzas/PizzasContext'
import { HiOutlineMinusSm as Minus, HiOutlinePlusSm as Add } from 'react-icons/hi'
import { IoTrashOutline as Remove } from 'react-icons/io5'

const CartItem = ({id, qty}) => {
  const {
    cart,
    addToCart,
    decrementQuantity,
    removePizza
  } = useContext(CartContext)
  const { allPizzas } = useContext(PizzasContext)
  const [ pizzaInfo, setPizzaInfo ] = useState({})

  const getPizzaInfo = (id) => {
    console.log('ID!!!! =>', id)
    const data = allPizzas.find(
      pizza => pizza._id === id
    )
    console.log('PIZZA INFORMATION =>', data)
    setPizzaInfo(data)
  }

  useEffect(() => {
    getPizzaInfo(id)
  }, [cart])

  return (
    <div className='cart_item_container d-flex flex-column'>
      <div className='d-flex justify-content-between'>
        <div>{pizzaInfo.name}</div>
        <div className=''>
          $ {qty * pizzaInfo.price}
        </div>
      </div>
      <div className='cart_item_quantity align-self-end d-flex align-items-center '>
        {
          qty === 1
          ? <Remove className='text-danger'
            onClick={() => removePizza(id)}
          />
          : <Minus className='text-danger'
            onClick={() => decrementQuantity(id)}
          />
        }
        <div className='px-1'>{qty}</div>
        <Add className='text-danger'
          onClick={() => addToCart(id)}
        />
      </div>
    </div>
  )
}

export default CartItem
