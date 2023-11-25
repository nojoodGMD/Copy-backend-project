import { Document, Schema, model } from 'mongoose'

export interface ICategory extends Document {
  name: string
  slug: string
}

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
