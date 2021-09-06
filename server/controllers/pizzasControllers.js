import Pizza from '../models/Pizza.js'


/* ----- CONTROLLERS ----- */

// GET all pizzas
export const getPizzas = async (req, res, next) => {
  try {
    const pizzas = await Pizza.find().sort('name')
    res.json( pizzas )
  } catch (err) {
    next( err )
  }
}

// GET pizza
export const getPizza = async (req, res, next) => {
  const { id } = req.params
  try {
    const pizza = await Pizza.findById( id )
    if(!pizza) throw new Error(
      404,
      `No Pizza with id ${id} can be found.`
    )
    res.json( pizza )
  } catch (err) {
    next( err )
  }
}

// CREATE pizza
export const createPizza = async (req, res, next) => {
  try {
    const createdPizza = await Pizza.create( req.body )
    res.json( createdPizza )
  } catch (err) {
    next( err )
  }
}

// UPDATE pizza
export const updatePizza = async (req, res, next) => {
  const { id } = req.params
  try {
    const updatedPizza = await Pizza.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    )
    if(!updatedPizza) throw new Error(
      404,
      `No Pizza with id ${id} can be found.`
    )
    res.json({
      success: `Pizza with id ${id} has been updated`
    })
  } catch (err) {
    next( err )
  }
}

// DELETE pizza
export const deletePizza = async (req, res, next) => {
  const { id } = req.params
  try {
    const deletedPizza = await Pizza.findByIdAndDelete( id )
    if(!deletedPizza) throw new Error(
      404,
      `No Pizza with id ${id} can be found`
    )
    res.json({
      success: `Pizza with id ${id} has been deleted`
    })
  } catch (err) {
    next( err )
  }
}