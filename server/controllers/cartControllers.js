import Cart from '../models/Cart.js'


// GET cart
export const getItems = async (req, res, next) => {
  try {
    const cart = await Cart.find()
    res.json( cart )
  } catch (err) {
    next( err )
  }
}

// CREATE-ADD to cart
export const createCart = async (req, res, next) => {
  try {
    // const { _id, quantity, name, price } = req.body
    // let cart = await Cart.find()
    // if (cart) {
    //   let pizzaIndex = cart.pizzas.findIndex(p => (
    //     p._id === _id
    //   ));
    //   if (pizzaIndex > -1) {
    //     let pizza = cart.pizzas[pizzaIndex];
    //     pizza.quantity = quantity;
    //     cart.pizzas[pizzaIndex] = pizza;
    //   } else {
    //     cart.products.push({
    //       _id,
    //       quantity,
    //       name,
    //       price
    //     })
    //   }
    //   cart = await cart.save()
    //   return res.json( cart )
    // } else {
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
    console.log(id)
    const updatedCart = await Cart.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    )
    res.json( updatedCart )
  } catch (err) {
    next( err )
  }
}

// DELETE item
export const deleteCart = async (req, res, next) => {
  try {
    const cart = await Cart.delete()
    res.json( cart )
  } catch (err) {
    next( err )
  }
}