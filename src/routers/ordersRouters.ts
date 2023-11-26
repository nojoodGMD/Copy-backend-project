import express from 'express'

import {
  getAllOrder,
  createOrder,
  updateSingleOrder,
  deleteSingleCategory,
} from '../controllers/orderController'

import { runValidation } from './../validation/runValidation'
import { validateCreateOrder, validateUpdateOrder } from '../validation/orderVal'

const router = express.Router()

router.get('/', getAllOrder)
router.post('/', validateCreateOrder, runValidation, createOrder)
router.put('/:slug', validateUpdateOrder, runValidation, updateSingleOrder),
  router.delete('/:slug', deleteSingleCategory)

export default router
