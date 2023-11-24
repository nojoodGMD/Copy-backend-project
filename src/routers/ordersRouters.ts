import express from 'express'
import {
  getAllOrder,
  createOrder,
  updateSingleOrder,
  deleteSingleCategory,
} from '../controllers/orderController'

const router = express.Router()

router.get('/', getAllOrder)
router.post('/', createOrder)
router.put('/', updateSingleOrder), router.delete('/', deleteSingleCategory)

export default router
