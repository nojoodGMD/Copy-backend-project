// // how to do this ?
// import { createHttpError } from '../errors/createError'
// import { Product } from '../models/productSchema'

import { Product } from "../models/productSchema";


// //GET->get all the product
// export const getProduct = async (page = 1, limit = 3) => {
//   //find how many product (document ) i have
//   const count = await Product.countDocuments()
//   console.log('document number:', count)
//   //total page
//   const totalPage = Math.ceil(count / limit)
//   console.log('total page number:', totalPage)

//   if (page > totalPage) {
//     page = totalPage
//   }

//   const skip = (page - 1) * limit


//   const products = await Product.find().populate('category').skip(skip).limit(limit)
//   return {
//     products,
//     totalPage,
//     currentPage: page,
//   }
// }

// //GET=>get single product
// export const findProductBySlug = async (slug: string) => {
//   const product = await Product.findOne({ slug: slug })

//   if (!product) {
//     const error = createHttpError(404, `Product is not found with this slug: ${slug}`)
//     throw error
//   }
//   return product
// }
// //DELETE ->delete single product
// export const deleteProductBySlug3 = async (slug: string) => {

//   const product = await Product.findOneAndDelete({ slug })
//   if (!product) {
//     const error = createHttpError(404, `Product is not found with this slug: ${slug}`)
//     throw error
//   }
//   return product
// }
//GET->get all the product services
export const productService = async (page: number, limit: number) => {
    const count = await Product.countDocuments();
    const totalPage = Math.ceil(count / limit);

    if (page > totalPage) {
        page = totalPage;
    }

    const skip = (page - 1) * limit;
    const products = await Product.find().skip(skip).limit(limit);

    return {
        products,
        totalPage,
        currentPage: page,
    };
};