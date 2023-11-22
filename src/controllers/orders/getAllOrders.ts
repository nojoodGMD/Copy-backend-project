import { Request, Response, NextFunction } from 'express'

import apiErrorHandler from '../../middlewares/errorHandler'
import Order from '../../models/order'

export const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
  const orders = await Order.find().populate('orders')
  try {
    res.json(orders)
  } catch (error) {
    apiErrorHandler
  }
}
