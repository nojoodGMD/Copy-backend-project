import slugify from 'slugify'
import { Request, Response, NextFunction } from 'express'

import { Product } from '../models/productSchema'

import {
  findProductBySlug,
  newProduct,
  productService,
  removeProductBySlug,
  updateProductServices,
} from '../services/productServices'

//return all products
export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 3
    const minPrice = Number(req.query.minPrice) || 0
    const maxPrice = Number(req.query.maxPrice) || 200000

    const result = await productService(page, limit, minPrice, maxPrice,req)

    res.send({
      message: 'Get all products',
      payload: {
        products: result.products,
        totalPage: result.totalPage,
        currentPage: result.currentPage,
      },
    })
  } catch (error) {
    next(error)
  }
}

//return a single product
export const getProductBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const slug = req.params.slug;
    const product = await findProductBySlug(req.params.slug)
    if (!product) {
      throw new Error('Product not found with this slug!')
    }
    res.send({ message: 'Get a single product', payload: product })
  } catch (error) {
    next(error)
  }
}

//Crete a product
export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, price, quantity, description, sold, shipping } = req.body

    const newItem = await newProduct(name, price, quantity, description, sold, shipping)

    res.status(201).send({ message: 'Product is created' })
  } catch (error) {
    next(error)
  }
}

//Delete a product
export const deleteProductBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await removeProductBySlug(req.params.slug)
    res.send({ message: 'Deleted a single product', payload: product })
  } catch (error) {
    next(error)
  }
}

// Update a product
export const updateProductBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params
    const product = await updateProductServices(req, slug)
    res.json({
      message: ' product is updated',
      payload: product,
    })
  } catch (error) {
    next(error)
  }
}
