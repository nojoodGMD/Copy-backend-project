import { Document } from 'mongoose'

import { IOrder } from './orderInterface'

export interface IUserOrders extends Document {
  orderId: IOrder['_id']
}

export interface IUser extends Document {
  name: string
  isAdmin: boolean
  isBanned: boolean
  email: string
  password: string
  image: string
  phone: string
  orders: IUserOrders[]
}
