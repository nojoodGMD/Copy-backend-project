import express from 'express'

import {
  getAllOrder,
  createOrder,
  updateSingleOrder,
  deleteSingleCategory,
} from '../controllers/orderController'
import { runValidation } from './../validation/runValidation'
import { validateCreateOrder, validateUpdateOrder } from '../validation/orderVal'
import { getSingleOrder } from '../services/orderServices'

const router = express.Router()

//GET->/api/orders-> get all orders
router.get('/', getAllOrder)
//GET->/api/orders/slug-> get a single orders
router.get('/:slug', getSingleOrder)
//POST->/api/orders-> create an order
router.post('/', validateCreateOrder, runValidation, createOrder)
//PUT ->/api/orders/slug->to update the single order
router.put('/:slug', validateUpdateOrder, runValidation, updateSingleOrder)
//DELETE ->/api/orders/slug->to delete an order
router.delete('/:slug', deleteSingleCategory)

export default router
