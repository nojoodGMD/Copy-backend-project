import { Schema, model } from 'mongoose'
export interface ICategory extends Document{
    name:string,
    slug:string
  }
const categorySchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      minlength: [3, 'Category name must be at least 3 characters long'],
      maxlength: [100, 'Category name must be at most 100 characters '],
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
