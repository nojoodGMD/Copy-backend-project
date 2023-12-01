import { Router } from 'express'

import {
  activateUser,
  banUser,
  deleteUser,
  getAllUsers,
  getUserById,
  registerUser,
  unbanUser,
  updateUser,
} from '../controllers/userController'
import { uploadUser } from '../middlewares/uploadFile'
import { validateCreateUser, validateUpdateUser } from '../validation/userVal'
import { runValidation } from '../validation/runValidation'

const router = Router()

// GET: /users -> return all the users
router.get('/', getAllUsers)
// GET: /users:id -> return the user based on the id
router.get('/:_id', getUserById)
//POST: /users/register -> register a new user
router.post(
  '/register',
  validateCreateUser,
  runValidation,
  uploadUser.single('image'),
  registerUser
)
// POST: /users/register -> register a new user successfly
router.post('/activate', activateUser)
//PUT: /user/:id -> update the user data based on the id
router.put('/:_id', validateUpdateUser, runValidation, updateUser)
//DELETE: /users/:id -> delete the user based on the id
router.delete('/:_id', deleteUser)
//PUT: /user/:id -> update the isBanned data based on the id
router.put('/ban/:_id', banUser)
//PUT: /user/:id -> update the isBanned data based on the id
router.put('/unban/:_id', unbanUser)
export default router
