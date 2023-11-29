import { Request } from 'express'

import { IItemes, IOrder, orderModel } from '../models/orderSchema'
import { createHttpError } from '../errors/createError'
import { Product } from '../models/productSchema'

export const getOrder = async () => {
  const order = await orderModel.find().populate("userId")
  return order
}

export const getSingleOrder = async (id: string) => { 
 
  const order = await orderModel.findOne({ _id:id}).populate("userId")
  if (!order) {
    const error = createHttpError(404, `order is not found with this id: ${id}`)
    throw error
  }
  return order
}
export const createSingleOrder = async (req:Request) => {
 
  const { userId, orderItems , shippingAddress } = req.body
  
  if (!userId || !orderItems || !shippingAddress) {
    throw createHttpError(404, `Order must contain products items and user data and shipping address`)
  }

  console.log(orderItems)

 

  const order  = new orderModel({
    userId,
    orderItems,
    shippingAddress, 
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
