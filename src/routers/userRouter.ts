import { Router } from 'express'

import { deleteUser, getAllUsers, getUserById, registerUser, updateUser } from '../controllers/userController';
import { uploadUser } from '../middlewares/uploadFile';

const router = Router();

// GET: /users -> return all the users
router.get('/',getAllUsers);

// router.get('/', async (_, res) => {
//     const users = await User.find().populate('order')
//     res.json({
//       users,
//     })
//   })

// GET: /users:id -> return the user based on the id
router.get('/:id',getUserById)

//POST: /users/register -> register a new user
router.post('/register',uploadUser.single("image"),registerUser);

//PUT: /user/:id -> update the user data based on the id
router.put('/:id',updateUser);

//DELETE: /users/:id -> delete the user based on the id
router.delete('/:id',deleteUser)

export default router;