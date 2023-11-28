import { Schema, model, Document } from 'mongoose'
import { ICategory } from './categorySchema'

export interface IProduct extends Document {
  name: string
  slug: string
  price: number
  image: string
  quantity: number
  sold: number
  shipping: number
  description: string
  createdAt?: string
  updatedAt?: string
  //insude the category schema idefine the id for category 
  //and i use here to make relation ship between product and category
  category: ICategory["_id"];
}

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, 'product name must be at least 3 character long'],
      maxlength: [300, 'product name must be at most 300 character long'],
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },

    price: {
      type: Number,
      required: true,
      trim: true,
    },

    quantity: {
      type: Number,
      required: true,
      trim: true,
    },

    sold: {
      type: Number,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: 'public/products/products.jpeg',
    },

    shipping: {
      type: Number,
      default: 0, // 0 -> free
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: [5, 'product description must be at least 5 character long'],
    },
    //to make relation between product to the category
    //Schema.Types.ObjectId the id from the collection of category
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  },
  
  { timestamps: true }
)

//create the model/collections
export const Product = model<IProduct>('Products', productSchema)
