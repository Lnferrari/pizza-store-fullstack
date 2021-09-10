import React, { useContext } from 'react'
import CartContext from '../contexts/cart/CartContext'
import { HiOutlineMinusSm as Minus, HiOutlinePlusSm as Add } from 'react-icons/hi'
import { IoTrashOutline as Remove } from 'react-icons/io5'

const CartItem = ({id, name, qty, price, image}) => {
  const {
    cart,
    addToCart,
    decrementQty,
    removePizza
  } = useContext(CartContext)


  return (
    <div className='cart_item_container d-flex flex-column'>
      <div className='d-flex justify-content-between'>
        <div>{name}</div>
        <div className=''>
          $ {qty * price}
        </div>
      </div>
      <div className='cart_item_qty align-self-end d-flex align-items-center '>
        {
          qty === 1
          ? <Remove className='text-danger'
            onClick={() => removePizza(id)}
          />
          : <Minus className='text-danger'
            onClick={() => decrementQty(id)}
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
