import Cart from '../models/Cart.js'

// GET all carts

export const getAllCarts = async (req, res, next) => {
  try {
    const carts = await Cart.find()
    res.json( carts )
  } catch (err) {
    next( err )
  }
}

// GET cart
export const getCart = async (req, res, next) => {
  try {
    const { id } = req.params
    const cart = await Cart.findById( id ).populate('pizzas.pizza', "-_id")
    res.json( cart )
  } catch (err) {
    next( err )
  }
}

// CREATE cart
export const createCart = async (req, res, next) => {
  try {
    const newCart = await Cart.create( req.body )
    res.json( newCart )
  } catch (err) {
    next( err )
  }
}


// UPDATE cart
export const updateCart = async (req, res, next) => {
  try {
    const { id } = req.params
    const updatedCart = await Cart.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    ).populate('pizzas.pizza')
    console.log('UPDATED CART => ', updatedCart)
    res.json( updatedCart )
  } catch (err) {
    next( err )
  }
}

// DELETE item
export const deleteCart = async (req, res, next) => {
  try {
    const { id } = req.params
    const updatedCart = await Cart.findByIdAndDelete( id )
    res.json( updatedCart )
  } catch (err) {
    next( err )
  }
} 