import { Request, Response, NextFunction } from 'express'

import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

import { createHttpError } from '../errors/createError'
import {
  createUserService,
  deleteUserSevice,
  getAllUsersService,
  getSingleUserService,
  updateUserService,
} from '../services/userServices'
import { dev } from '../config/server'
import User from '../models/userSchema'

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 3

    const result = await getAllUsersService(page, limit, req)
    res.status(200).json({
      message: 'All users are fetched successfully!',
      payload: {
        users: result.users,
        totalPage: result.totalPage,
        currentPage: result.currentPage,
      },
    })
  } catch (error) {
    next(error)
  }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id } = req.params
    const user = await getSingleUserService(_id)
    res.status(200).json({
      message: 'users is returned successfully!',
      payload: user,
    })
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      const error = createHttpError(400, `Id format is not valid `)
      next(error)
    } else {
      next(error)
    }
  }
}

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await createUserService(req, res, next)
    res.status(201).json({
      message: 'user is registered successfully',
      payload: newUser,
    })
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id } = req.params
    const user = await updateUserService(_id, req)
    res.status(200).json({
      message: 'users is updated successfully!',
      payload: user,
    })
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      const error = createHttpError(400, `Id format is not valid `)
      next(error)
    } else {
      next(error)
    }
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id } = req.params
    await deleteUserSevice(_id)
    res.status(200).json({
      message: 'users is deleted successfully!',
    })
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      const error = createHttpError(400, `Id format is not valid `)
      next(error)
    } else {
      next(error)
    }
  }
}

export const activateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.body.token

    if (!token) {
      throw createHttpError(404, 'Please provide a valid token')
    }
    const decoded = jwt.verify(token, dev.app.jwtUserActivationkey)

    if (!decoded || decoded instanceof jwt.TokenExpiredError) {
    }

    await User.create(decoded)

    res.status(201).json({
      message: 'user is registerd successfuly',
    })
  } catch (error) {
    //token expired, test it
    if (error instanceof jwt.TokenExpiredError) {
      next(createHttpError(401, 'your token has expired'))
    } else {
      // next(error);
      next(createHttpError(404, 'Invalid token'))
    }
  }
}
