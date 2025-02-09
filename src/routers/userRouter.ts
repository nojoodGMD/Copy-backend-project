import { Router } from 'express'

import {
  activateUser,
  banUser,
  changeRole,
  deleteUser,
  forgetPassword,
  getAllUsers,
  getUserById,
  registerUser,
  resetPassword,
  unbanUser,
  updateUser,
} from '../controllers/userController'
import { uploadUser } from '../middlewares/uploadFile'
import { validateCreateUser, validateUpdateUser } from '../validation/userVal'
import { runValidation } from '../validation/runValidation'
import { isAdmin, isLoggedIn, isLoggedOut } from '../middlewares/auth'

const router = Router()

// GET: /users -> return all the users
router.get('/', isLoggedIn, isAdmin, getAllUsers)
// GET: /users:id -> return the user based on the id
router.get('/:_id([0-9a-fA-F]{24})', isLoggedIn, getUserById)
//POST: /users/register -> register a new user
router.post(
  '/register',
  uploadUser.single('image'),
  isLoggedOut,
  registerUser
)
// POST: /users/register -> register a new user successfly
router.post('/activate', isLoggedOut, activateUser)
//PUT: /user/:id -> update the user data based on the id
router.put('/:_id', validateUpdateUser, runValidation, isLoggedIn, updateUser)
//DELETE: /users/:id -> delete the user based on the id
router.delete('/:_id([0-9a-fA-F]{24})', isLoggedIn, deleteUser)
//  PUT: /user/role -> change user role the user
router.put('/changeRole/:id([0-9a-fA-F]{24})', isLoggedIn, isAdmin, changeRole)
//PUT: /user/:ban -> ban the user
router.put('/ban/:id([0-9a-fA-F]{24})', isLoggedIn, isAdmin, banUser)
//PUT: /user/:unban -> unban the user
router.put('/unban/:id([0-9a-fA-F]{24})', isLoggedIn, isAdmin, unbanUser)
//POST :/user/forget-password-> handle forget password
router.post('/forget-password', isLoggedOut, forgetPassword)
//PUT :/user/reset-password-> handle reset password
router.put('/reset-password',isLoggedOut, resetPassword)
// GET: /users -> return all the users
router.get('/', isLoggedIn, isAdmin, getAllUsers)
// GET: /users:id -> return the user based on the id
router.get('/:_id([0-9a-fA-F]{24})', isLoggedIn, getUserById)
//POST: /users/register -> register a new user
router.post(
  '/register',
  validateCreateUser,
  runValidation,
  uploadUser.single('image'),
  isLoggedOut,
  registerUser
)

export default router
