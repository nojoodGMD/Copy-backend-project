import { Schema, model } from 'mongoose'

export interface IOrder {
  name: string
  products: string
  slug: string
}

const orderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  products: {
    type: String,
    ref: 'Product',
  },
})

export const orderModel = model<IOrder>('Order', orderSchema)
