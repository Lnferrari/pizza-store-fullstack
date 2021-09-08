import express from 'express'
import {
  getItems,
  createCart,
  updateCart,
  deleteCart
} from '../controllers/cartControllers.js'


const router = express.Router()


router.route('/').get(getItems).post(createCart)
router.route('/:id').patch(updateCart).delete(deleteCart)


export default router