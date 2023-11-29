import express from 'express'

import {
  getAllOrder,
  createOrder,
  updateSingleOrder,
  deleteSingleOrder,
  getOrderById,
} from '../controllers/orderController'

const router = express.Router()

//GET->/api/orders-> get all orders
router.get('/', getAllOrder)
//GET->/api/orders/slug-> get a single orders
router.get('/:_id', getOrderById)
//POST->/api/orders-> create an order
router.post('/', createOrder)
//PUT ->/api/orders/slug->to update the single order
router.put('/:_id', updateSingleOrder)
//DELETE ->/api/orders/slug->to delete an order
router.delete('/:_id', deleteSingleOrder)

export default router
