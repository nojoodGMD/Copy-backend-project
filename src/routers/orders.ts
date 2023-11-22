import express from 'express'
import { getAllOrders } from '../controllers/orders/getAllOrders'
import Order from '../models/order'
const router = express.Router()

import { postOrder } from '../controllers/orders/postOrder'

router.get('/', getAllOrders)
router.post('/',postOrder )

export default router
