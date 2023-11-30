import { Schema, model } from 'mongoose'

import { ICategory } from '../Interfaces/categoryInterface'

export const categorySchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    slug: {
      type: String,
      required: true,
      lowercase: true,
    },
  },
  { timestamps: true }
)

export const categoryModel = model<ICategory>('Category', categorySchema)
