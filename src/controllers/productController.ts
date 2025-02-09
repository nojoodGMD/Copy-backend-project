import { Request, Response, NextFunction } from 'express'

import {
  findProductBySlug,
  createNewProductService,
  getAllProductService,
  removeProductBySlug,
  updateProductServices,
} from '../services/productServices'
import { createHttpError } from '../errors/createError'
import { Product } from '../models/productSchema'

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const minPrice = Number(req.query.minPrice) || 0
    const maxPrice = Number(req.query.maxPrice) || 2000000

    const result = await getAllProductService(page, limit, minPrice, maxPrice, req)

    res.status(200).send({
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

export const getProductBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await findProductBySlug(req.params.slug)
    if (!product) {
      throw createHttpError(404, 'Product not found with this slug!')
    }
    
    res.status(200).send({ message: 'Get a single product', payload: product })
  } catch (error) {
    next(error)
  }
}

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('inside createProduct')
    const { name, price, quantity, description, sold, shipping, categoryId } = req.body
    const imagePath = req.file?.path
    console.log(req.body)

    const newItem = await createNewProductService(name, price, quantity, description, sold, shipping, categoryId, String(imagePath))

    const allProducts = await Product.find()

    res.status(201).send({ 
      message: 'Product is created',
      allProducts
    })
  } catch (error) {
    next(error)
  }
}

export const deleteProductBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await removeProductBySlug(req.params.slug)
    const restOfProduct = await Product.find()

    res.status(200).send({ message: 'Deleted product successfully!', payload: restOfProduct })
  } catch (error) {
    next(error)
  }
}

export const updateProductBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { slug } = req.params
    const products = await updateProductServices(req, slug)

    res.status(200).json({
      message: ' product is updated',
      payload: products,
    })
  } catch (error) {
    next(error)
  }
}
