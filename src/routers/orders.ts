import express from 'express'
import { getAllOrders } from '../controllers/orders/getAllOrders'
import Order from '../models/orderSchema'
const router = express.Router()

import { postOrder } from '../controllers/orders/postOrder'

router.get('/', getAllOrders)
router.post('/',postOrder )

export default router
