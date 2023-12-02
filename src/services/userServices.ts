import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'

import { userType } from '../types'
import User from '../models/userSchema'
import generateToken from '../util/generateToken'
import { handleSendEmail } from '../helper/sendEmail'
import { createHttpError } from '../errors/createError'
import { deleteImage } from '../helper/deleteImageHelper'

export const getAllUsersService = async (page: number, limit: number, req: Request) => {
  const count = await User.countDocuments()
  if (count <= 0) {
    throw createHttpError(404, 'There are no user yet to show.')
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
  const options = {
    password: 0,
    __v: 0,
  }

  const users = await User.find(filter, options)
    .populate('orders')
    .sort({ name: 1 })
    .skip(skip)
    .limit(limit)
  return {
    users,
    totalPage,
    currentPage: page,
  }
}

export const getSingleUserService = async (id: string) => {
  const options = {
    password: 0,
    __v: 0,
  }

  const users = await User.findOne({ _id: id }, options).populate('orders')

  if (!users) {
    const error = createHttpError(404, `User with this id:${id} does not exist.`)
    throw error
  }
  return users
}

export const isUserExistService = async (email: string) => {
  const user = await User.exists({ email: email })
  if (user) {
    const error = createHttpError(409, 'User with this email already exists.')
    throw error
  }
}

export const createUserService = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, phone } = req.body
    await isUserExistService(email)
    const imagePath = req.file?.path

    const hashedPassword = await bcrypt.hash(password, 10)

    const tokenPayload: userType = {
      name: name,
      email: email,
      password: hashedPassword,
      phone: phone,
    }
    if (imagePath) {
      tokenPayload.image = imagePath
    }

    const token = generateToken(tokenPayload)

    //send an email -> activiate the user (token) inside the email -> click verfied
    const emailData = {
      email: email,
      subject: 'Activate your account',
      html: `<h1> Hello ${name} </h1>

    <p> Please activate your account by
    <a href= "http://localhost:8080/users/activate/${token}"> clicking on this link </a> </p>`,
    }

    await handleSendEmail(emailData)

    res.status(200).json({
      message: 'check your email adress to activate your account',
      token: token,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteUserSevice = async (id: string) => {
  const user = await User.findByIdAndDelete({ _id: id })
  if (user && user.image) {
    await deleteImage(user.image)
  }
  if (!user) {
    const error = createHttpError(404, "User with this id doesn't exist")
    throw error
  }
}

export const updateUserService = async (id: string, req: Request) => {
  const newData = req.body
  const user = await User.findOneAndUpdate({ _id: id }, newData, { new: true })
  if (!user) {
    const error = createHttpError(404, "User with this id doesn't exist")
    throw error
  }
  return user
}

export const banUserById = async (id: string) => {
  const user = await User.findByIdAndUpdate({ _id: id }, { isBanned: true })
  if (!user) {
    const error = createHttpError(404, `user is not found with this id: ${id}`)
    throw error
  }
}
export const unbanUserById = async (id: string) => {
  const user = await User.findByIdAndUpdate({ _id: id }, { isBanned: false })
  if (!user) {
    const error = createHttpError(404, `user is not found with this id: ${id}`)
    throw error
  }
}
