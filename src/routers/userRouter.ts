import { Router } from 'express'

import {
  deleteUser,
  getAllUsers,
  getUserById,
  registerUser,
  updateUser,
} from '../controllers/userController'
import { uploadUser } from '../middlewares/uploadFile'
import { validateCreateUser, validateUpdateUser } from '../validation/userVal'
import { runValidation } from '../validation/runValidation'

const router = Router()

// GET: /users -> return all the users
router.get('/', getAllUsers)
// GET: /users:id -> return the user based on the id
router.get('/:id', getUserById)
//POST: /users/register -> register a new user
router.post(
  '/register',
  validateCreateUser,
  runValidation,
  uploadUser.single('image'),
  registerUser
)
//PUT: /user/:id -> update the user data based on the id
router.put('/:id', validateUpdateUser, runValidation, updateUser)
//DELETE: /users/:id -> delete the user based on the id
router.delete('/:id', deleteUser)

export default router
