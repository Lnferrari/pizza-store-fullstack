import express from 'express'
import {
  getPizzas,
  getPizza,
  createPizza,
  updatePizza,
  deletePizza
} from '../controllers/pizzasControllers.js'


const router = express.Router()


router.route('/').get(getPizzas).post(createPizza)
router.route('/:id').get(getPizza).patch(updatePizza).delete(deletePizza)

export default router