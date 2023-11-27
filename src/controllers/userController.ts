import { Request, Response, NextFunction } from 'express'

import {
  createUserService,
  deleteUserSevice,
  getAllUsersService,
  getSingleUserService,
  isUserExistService,
  updateUserService,
} from '../services/userServices'

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 3
    const result = await getAllUsersService(page, limit)
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
    const user = await getSingleUserService(req)
    res.status(200).json({
      message: 'users is returned successfully!',
      payload: user,
    })
  } catch (error) {
    next(error)
  }
}

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await createUserService(req)
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
    const user = await updateUserService(req)
    res.status(200).json({
      message: 'users is updated successfully!',
      payload: user,
    })
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await deleteUserSevice(req)
    res.status(200).json({
      message: 'users is deleted successfully!',
    })
  } catch (error) {
    next(error)
  }
}
