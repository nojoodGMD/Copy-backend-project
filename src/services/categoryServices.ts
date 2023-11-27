import { Request } from 'express'
import slugify from 'slugify'

import { ICategory, categoryModel } from '../models/categorySchema'
import { createHttpError } from '../errors/createError'

export const getCategory = async () => {
  const category = await categoryModel.find()
  return category
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

export const updateSingleCategory = async (slug: string, req: Request): Promise<ICategory> => {
  if (req.body.name) {
    req.body.slug = slugify(req.body.name)
  }
  const updateData = req.body
  const category = await categoryModel.findOneAndUpdate({ slug }, updateData, { new: true })
  if (!category) {
    const error = createHttpError(404, `Category is not found with this slug: ${slug}`)
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
