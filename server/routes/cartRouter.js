import express from 'express'
import {
  getAllCarts,
  getCart,
  updateCart,
  deleteCart,
  createCart
} from '../controllers/cartControllers.js'

const router = express.Router()


router.route('/')
  .get(getAllCarts)
  .post(createCart)
router.route('/:id')
  .get(getCart)
  .patch(updateCart)
  .delete(deleteCart)


export default router