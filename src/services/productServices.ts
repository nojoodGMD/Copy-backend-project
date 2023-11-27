import slugify from 'slugify'
import { Request } from 'express'

import { IProduct, Product } from '../models/productSchema'
import { createHttpError } from '../errors/createError'
import ApiError from '../errors/ApiError'
import apiErrorHandler from '../middlewares/errorHandler'

//GET->get all the product services
export const productService = async (
  page: number,
  limit: number,
  minPrice: number,
  maxPrice: number
) => {
  const count = await Product.countDocuments()
  if (count <= 0) {
    throw new ApiError(404, 'There are no products yet to show, please add products.')
  }

  const totalPage = Math.ceil(count / limit)
  if (page > totalPage) {
    page = totalPage
  }
  const skip = (page - 1) * limit
  const filterProductsByPrice = {
    $and: [{ price: { $gt: minPrice } }, { price: { $lt: maxPrice } }],
  }
  const products = await Product.find(filterProductsByPrice).sort({ name: 1 }).skip(skip).limit(limit)

  return {
    products,
    totalPage,
    currentPage: page,
  }
}

//get single products
export const findProductBySlug = async (slug: string): Promise<IProduct> => {
  const product = await Product.findOne({ slug: slug })
  if (!product) {
    throw new Error('Product not found with this slug!')
  }
  return product
}

//delete a single product
export const removeProductBySlug = async (slug: string): Promise<IProduct> => {
  const product = await Product.findOneAndDelete({
    slug: slug,
  })
  if (!product) {
    throw new Error('Product not found with this slug!')
  }
  return product
}

//create a product
export const newProduct = async (
  name: string,
  price: number,
  quantity: number,
  description: string,
  sold: boolean,
  shipping: string
) => {
  // Check if a product with the same name already exists
  const productExist = await Product.exists({ name })

  if (productExist) {
    throw createHttpError(409, 'Product already exists with this name')
  }

  const newProduct = new Product({
    name,
    slug: slugify(name),
    price,
    quantity,
    description,
    sold,
    shipping,
  })

  await newProduct.save()
}

//update a product
export const updateProductServices = async (req: Request, slug: string): Promise<IProduct> => {
  if (req.body.slug) {
    //update the slug value
    req.body.slug = slugify(req.body.name)
  }

  // Always update the slug based on the name
  const updatedSlug = slugify(req.body.name)

  const updateData = {
    ...req.body,
    slug: updatedSlug,
  }

  //in this function i base 2 things 1- is id 2- is udated data and i will get this data from req.body
  const product = await Product.findOneAndUpdate({ slug }, updateData, {
    new: true,
  })
  if (!product) {
    const error = createHttpError(404, `Product is not found with this slug: ${slug}`)
    throw error
  }
  return product
}
