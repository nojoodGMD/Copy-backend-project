import { Schema, model } from 'mongoose'
import { IUser } from './userSchema'
import { IProduct } from './productSchema'
import { execSync } from 'child_process'

export interface IOrder extends Document {
  userId: IUser['_id']
  orderItems: [IItemes["_id"]]
  totalAmount: Number
  shippingAddress: String
}
export interface IItemes extends Document{
  _id: string
  product: IProduct['_id']
  quantity: number
}

const orderSchema = new Schema<IOrder>({
  orderItems: [
    {
      quantity: {
         type: Number,
         required: true,
         default: 1
         },

      product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Products',
      },
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  totalAmount: {
    type: Number,
    default: 0
  },
  shippingAddress: {
    type: String,
    required: true
  },
}, {timestamps : true})

export const orderModel = model<IOrder>('Order', orderSchema)
