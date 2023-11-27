import { Request } from 'express'

import ApiError from '../errors/ApiError'
import User from '../models/userSchema'

//GET-> get all users
export const getAllUsersService = async (page: number, limit: number, req: Request) => {
  const count = await User.countDocuments()
  if (count <= 0) {
    throw new ApiError(404, 'There are no user yet to show.')
  }
  const totalPage = Math.ceil(count / limit)

  if (page > totalPage) {
    page = totalPage
  }
  const skip = (page - 1) * limit
  const { search } = req.query
  let filter = {}
  if (search) {
    const searchRegExp = new RegExp('.*' + search + '.*', 'i')

    filter = {
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
      ],
    }
  }
  const users = await User.find(filter).skip(skip).limit(limit)
  return {
    users,
    totalPage,
    currentPage: page,
  }
}

//GET-> get user by id
export const getSingleUserService = async (id: string) => {
  const users = await User.findOne({ _id: id })
  if (!users) {
    const error = new ApiError(404, `User with this id:${id} does not exist.`)
    throw error
  }
  return users
}

// Check if user already exists
export const isUserExistService = async (req: Request) => {
  const { email } = req.body
  const user = await User.exists({ email: email })
  if (user) {
    const error = new ApiError(409, 'User with this email already exists.')
    throw error
  }
}

//create a new user
export const createUserService = async (req: Request) => {
  await isUserExistService(req)
  const { name, email, password, phone } = req.body
  const imagePath = req.file?.path

  const newUser = new User({
    name: name,
    email: email,
    password: password,
    phone: phone,
    image: imagePath,
  })

  await newUser.save()
  return newUser
}

//delete user
export const deleteUserSevice = async (id: string) => {
  const user = await User.findOneAndDelete({ _id: id })
  if (!user) {
    const error = new ApiError(404, "User with this id doesn't exist")
    throw error
  }
}

//update user
export const updateUserService = async (id: string, req: Request) => {
  const newData = req.body
  const user = await User.findOneAndUpdate({ _id: id }, newData, { new: true })
  if (!user) {
    const error = new ApiError(404, "User with this id doesn't exist")
    throw error
  }
  return user
}
