import { Request } from 'express'
import slugify from 'slugify'

import { categoryModel } from '../models/categorySchema'
import { createHttpError } from '../errors/createError'
import { ICategory } from '../interface/categoryInterface'
import { updateOrder } from './orderServices'

export const getCategory = async (req: Request) => {
  const categories = req.query.name
  if (!categories) {
    const category = await categoryModel.find()
    return category
  } else {
    const filterProductByCategory = { name: { $eq: categories } }
    const category = await categoryModel.find(filterProductByCategory)
    return category
  }
}

export const deleteCategory = async (slug: string): Promise<ICategory> => {
  const category = await categoryModel.findOneAndDelete({ slug })
  if (!category) {
    const error = createHttpError(404, `category is not found with this slug: ${slug}`)
    throw error
  }
  return category
}

export const getCategoryBySlug = async (slug: string): Promise<ICategory> => {
  const category = await categoryModel.findOne({ slug })
  if (!category) {
    const error = createHttpError(404, `category is not found with this slug: ${slug}`)
    throw error
  }
  return category
}

export const updateSingleCategory = async (_id: string, req: Request): Promise<ICategory> => {
  const newSlug = slugify(req.body.name)

  const updateData = { name: req.body.name, slug: newSlug }
  const category = await categoryModel.findOneAndUpdate({ _id }, updateData, { new: true })
  if (!category) {
    const error = createHttpError(404, `Category is not found with this id: ${_id}`)
    throw error
  }
  return category
}

export const createSingleCategory = async (name: string) => {
  const categoryExists = await categoryModel.exists({ name })
  if (categoryExists) {
    const error = createHttpError(409, 'Category already exist with this name')
    throw error
  }
  const category: ICategory = new categoryModel({
    name,
    slug: slugify(name),
  })
  await category.save()

  return category
}
