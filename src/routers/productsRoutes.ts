import { Router } from 'express'
import {
  createProduct,
  deleteProductBySlug,
  
  getAllProducts,
  
  getProductBySlug,
  updateProductBySlug,
} from '../controllers/productController'

const router = Router();

// GET: /products -> return all the products
router.get('/', getAllProducts)

//GET: /product/:slug -> get a single product based on slug
router.get('/:slug', getProductBySlug)

//POST: /products -> create a new product
router.post('/', createProduct)

// Delete: /products/:slug -> delete a product
router.delete('/:slug', deleteProductBySlug)

// Update: /products/:slug -> Update a product by slug
router.put('/:slug', updateProductBySlug)

export default router;
