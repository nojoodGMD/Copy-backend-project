import { Request } from 'express'

import { orderModel } from '../models/orderSchema'
import { createHttpError } from '../errors/createError'

export const getOrder = async () => {
  const order = await orderModel.find().populate("user","orderItems")
  return order
}

export const getSingleOrder = async (id: string) => {
 
  const order = await orderModel.findOne({ _id:id}).populate("user","orderItems")
  if (!order) {
    const error = createHttpError(404, `order is not found with this id: ${id}`)
    throw error
  }
  return order
}
export const createSingleOrder = async (req:Request) => {
  const { user,orderItems } = req.body
  const order = new orderModel({
    user,
    orderItems
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
