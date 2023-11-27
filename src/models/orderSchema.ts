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
  orderItems: [
    {
      qty: { type: Number, required: true },

      product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Product',
      },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
})

export const orderModel = model<IOrder>('Order', orderSchema)
