import { NextFunction, Request, Response } from 'express'
import slugify from 'slugify'
import { orderModel } from '../models/orderSchema'
import { createSingleOrder, deleteOrder, getOrder, updateOrder } from '../services/orderServices'

export const getAllOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = await getOrder()
    res.send({
      message: 'all order are returned',
      payload: order,
    })
  } catch (error) {
    next(error)
  }
}

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body
    await createSingleOrder(name)
    const order = new orderModel({
      name,
      slug: slugify(name),
    })
    await order.save()
    res.status(201).json({
      message: 'single category created.',
      payload: order,
    })
  } catch (error) {
    next(error)
  }
}

export const updateSingleOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params
    const order = await updateOrder(slug, req)
    res.send({
      message: 'update single order ',
      payload: order,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteSingleCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params
    await deleteOrder(slug)
    res.json({
      message: 'Delete order',
    })
  } catch (error) {
    next(error)
  }
}
