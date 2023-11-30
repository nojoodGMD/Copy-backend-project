import { Request } from 'express'

import { IItemes, orderModel } from '../models/orderSchema'
import { createHttpError } from '../errors/createError'
import { Product } from '../models/productSchema'
import User from '../models/userSchema'

export const getOrder = async () => {
  const order = await orderModel.find().populate(['userId', 'orderItems'])
  return order
}

export const getSingleOrder = async (id: string) => { 
 
  const order = await orderModel.findOne({ _id:id}).populate(['userId', 'orderItems'])
  if (!order) {
    const error = createHttpError(404, `order is not found with this id: ${id}`)
    throw error
  }
  return order
}
export const createSingleOrder = async (req:Request) => {
 
  const { userId , orderItems, shippingAddress } : {userId:string , orderItems: IItemes[], shippingAddress:string } = req.body

  if (!userId || !orderItems || !shippingAddress) {
    throw createHttpError(404, `Order must contain products items and user data and shipping address`)
  }

  const  user = await User.findOne({ _id: userId })
  if(!user) {
    throw createHttpError(404, `User is not found with this id: ${userId}`)
  }

  //Get the total amount of money
  const productsID = orderItems.map(item=> item.product)
  const products = await Product.find({ _id: { $in: productsID } })
  const totalAmount = products.reduce((total, product) => total + product.price, 0)

  const order = new orderModel({
    userId,
    orderItems,
    shippingAddress,
    totalAmount
  })
  await order.save()
  return order
}

export const updateOrder = async (id: string, req: Request) => {
  const updateData = req.body
  const order = await orderModel.findOneAndUpdate({ _id:id }, updateData, { new: true })
  if (!order) {
    const error = createHttpError(404, `order is not found with this id: ${id}`)
    throw error
  }
  return order
}

export const deleteOrder = async (id: string) => {
  const order = await orderModel.findOneAndDelete({ _id:id })
  if (!order) {
    const error = createHttpError(404, `order is not found with this id: ${id}`)
    throw error
  }
  return order
}
