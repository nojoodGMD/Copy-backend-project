import { NextFunction, Request, Response } from 'express'
import slugify from 'slugify'

import { categoryModel } from '../models/categorySchema'
import {
  createSingleCategory,
  deleteCategory,
  getCategory,
  getCategoryBySlug,
  updateSingleCategory,
} from '../services/categoryServices'

export const getAllCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //the service for get all the product
    const category = await getCategory()
    res.send({
      message: 'all category are returned',
      payload: category,
    })
  } catch (error) {
    next(error)
  }
}

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body
    await createSingleCategory(name)
    const category = new categoryModel({
      name,
      slug: slugify(name),
    })
    await category.save()
    res.status(201).json({
      message: 'single category created.',
      payload: category,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteSingleCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params
    //service for delete single product
    await deleteCategory(slug)
    res.json({
      message: 'single category is dleted',
    })
  } catch (error) {
    next(error)
  }
}
export const getSingleCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params
    //services
    const category = await getCategoryBySlug(slug)
    res.json({
      message: 'single category are returend',
      paylaod: category,
    })
  } catch (error) {
    next(error)
  }
}

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params
    const category = await updateSingleCategory(slug, req)
    res.send({
      message: 'single category updated',
      payload: category,
    })
  } catch (error) {
    next(error)
  }
}
