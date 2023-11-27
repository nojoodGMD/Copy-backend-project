import slugify from 'slugify'
import { Request } from 'express'

import { orderModel } from '../models/orderSchema'
import { createHttpError } from '../errors/createError'

export const getOrder = async () => {
  const order = await orderModel.find()
  return order
}

export const getSingleOrder = async (slug: string) => {
  const order = await orderModel.find({ slug })
  if (order.length == 0) {
    const error = createHttpError(404, `order is not found with this slug: ${slug}`)
    throw error
  }
  return order
}
export const createSingleOrder = async (name: string) => {
  const orderExists = await orderModel.exists({ name })
  if (orderExists) {
    const error = createHttpError(409, 'order already exist with this name')
    throw error
  }

  return orderExists
}

export const updateOrder = async (slug: string, req: Request) => {
  if (req.body.name) {
    req.body.slug = slugify(req.body.name)
  }
  const updateData = req.body
  const order = await orderModel.findOneAndUpdate({ slug }, updateData, { new: true })
  if (!order) {
    const error = createHttpError(404, `order is not found with this slug: ${slug}`)
    throw error
  }
  return order
}

export const deleteOrder = async (slug: string) => {
  const order = await orderModel.findOneAndDelete({ slug })
  if (!order) {
    const error = createHttpError(404, `order is not found with this slug: ${slug}`)
    throw error
  }
  return order
}
