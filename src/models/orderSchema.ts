import { Schema, model } from 'mongoose'
import { IUser } from './userSchema'
import { IProduct } from './productSchema'

export interface IItemes extends Document{
  _id: string
  product: IProduct['_id']
  quantity: number
}
export interface IOrder extends Document {
  _id: string
  userId: IUser['_id']
  orderItems: IItemes[]
  totalAmount: Number
  status:  'Pending'|'Shipped' |'Delivered' | 'Canceled'
  shippingAddress: String
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
  status:{
    type: String,
    default: 'Pending',
    enum: [
      'Pending',
      'Shipped',
      'Delivered',
      'Canceled'
    ]
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
