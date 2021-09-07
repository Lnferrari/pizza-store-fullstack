import express from 'express'
import {
  getCart,
  createCart,
  updateCart,
  removeItem
} from '../controllers/cartControllers.js'


const router = express.Router()


router.route('/').get(getCart).post(createCart)
router.route('/:id').patch(updateCart).delete(removeItem)


export default router