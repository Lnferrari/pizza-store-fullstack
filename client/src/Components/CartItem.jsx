import React, { useContext } from 'react'
import CartContext from '../contexts/cart/CartContext'
import { HiOutlineMinusSm as Minus, HiOutlinePlusSm as Add } from 'react-icons/hi'
import { IoTrashOutline as Remove } from 'react-icons/io5'

const CartItem = ({id, name, qty, price}) => {
  const {
    addToCart,
    decrementQty,
    removeFromCart
  } = useContext(CartContext)
  console.log('CART ITEM =>', id, name, qty, price)

  return (
    <div className='cart_item_container d-flex flex-column p-1'>
      <div className='d-flex justify-content-between'>
        <div>{name}</div>
        <div className='fw-light'>
          $ {qty * price}
        </div>
      </div>
      <div className='cart_item_qty align-self-end d-flex align-items-center'>
        {
          qty === 1
          ? <Remove className='text-danger'
            onClick={() => removeFromCart(id)}
          />
          : <Minus className='text-danger'
            onClick={() => decrementQty(id)}
          />
        }
        <div className='px-2 py-1 fw-bold'>{qty}</div>
        <Add className='text-danger'
          onClick={() => addToCart(id)}
        />
      </div>
    </div>
  )
}

export default CartItem
