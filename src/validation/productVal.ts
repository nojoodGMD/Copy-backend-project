//product valdiation
import { check } from 'express-validator'

export const createProductValidation = [
  check('name')
    .trim()
    .notEmpty()
    .withMessage('name is missing')
    .isLength({ min: 3 })
    .withMessage('name must have at least 3 characters'),
  check('price')
    .trim()
    .notEmpty()
    .withMessage('Price is missing')
    .isFloat({ min: 1 })
    .withMessage('price must be a postive number'),
]

export const updateProductValidation = [
  check('name')
    .trim()
    .notEmpty()
    .withMessage('name is missing')
    .isLength({ min: 3 })
    .withMessage('name must have at least 3 characters'),
  check('price')
    .trim()
    .notEmpty()
    .withMessage('Price is missing')
    .isFloat({ min: 1 })
    .withMessage('price must be a postive number'),
]
