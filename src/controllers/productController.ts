
import slugify from 'slugify'
import { Request, Response, NextFunction } from 'express'

import { Product } from '../models/productSchema'
import { productService } from '../services/productServices'

//return all productes
export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 3
    const result = await productService(page, limit)

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
    const product = await Product.find({ slug: req.params.slug })
    if (product.length == 0) {
      //create the httperror do it later, createHttpError(404, "Product not found with this slug")
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

    // Check if a product with the same name already exists
    const productExist = await Product.exists({ name: name })
    if (productExist) {
      throw new Error('Product already exist with this slug!')
    }

    const newProduct = new Product({
      name: name,
      slug: slugify(name),
      price: price,
      quantity: quantity,
      description: description,
      sold: sold,
      shipping: shipping,
    })

    await newProduct.save()
    res.status(201).send({ message: 'Product is created' })
  } catch (error) {
    next(error)
  }
}

//Delete a product
export const deleteProductBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findOneAndDelete({ slug: req.params.slug })
    console.log(product)
    if (!product) {
      throw new Error('Product not found with this slug!')
    }
    res.send({ message: 'Deleted a single product', payload: product })
  } catch (error) {
    next(error)
  }
}

// Update a product
export const updateProductBySlug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.body.name) {
      //update the slug
      req.body.slug = slugify(req.body.name)
    }
    const product = await Product.findOneAndUpdate({ slug: req.params.slug }, req.body, {
      new: true,
    })
    if (!product) {
      throw new Error('Product not found with this slug!')
    }
    res.send({ message: 'Update a single product', payload: product })
  } catch (error) {
    next(error)
  }
}
