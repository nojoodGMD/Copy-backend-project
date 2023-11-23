import { Request, Response, NextFunction } from 'express'

import Order from '../../models/order'

export const postOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { name, products } = req.body

  const order = new Order({
    name,
    products,
  })
  console.log('orderId:', order._id)

//   const user = new User({
//     name: 'Walter',
//     order: order._id,
//   })

  await order.save()
//   await user.save()
  res.json(order)
}
