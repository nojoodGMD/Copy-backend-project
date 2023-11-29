import { Schema, model } from 'mongoose'
import { IUser } from './userSchema'
import { IProduct } from './productSchema'

export interface IOrder {
  user: IUser['_id']
  products: string
}
export interface IItemes {
  _id: string
  product: IProduct['_id']
  quantity: number
}
const orderSchema = new Schema({
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
