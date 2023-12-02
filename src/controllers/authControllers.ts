import { Request, Response, NextFunction } from 'express'
import JWT from 'jsonwebtoken'

import User from '../models/userSchema'
import { createHttpError } from '../errors/createError'
import { dev } from '../config/server'

export const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })

    if (!user) {
      throw createHttpError(404, 'Invalid email or password')
    }

    if (user.isBanned) {
      throw createHttpError(401, 'User is banned')
    }

    const accessToken = JWT.sign({ _id: user._id }, dev.app.ACCESS_TOKEN_SECRET, {
      expiresIn: '1h',
    })

    res.cookie('access_token', accessToken, {
      maxAge: 15 * 60 * 1000, // 15 minutes
      httpOnly: true,
      sameSite: 'none',
    })

    res.send({
      message: 'login success',
      payload: user,
    })
  } catch (error) {
    next(error)
  }
}

export const handleLogout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie('access_token')
    res.send({
      message: 'logout success',
    })
  } catch (error) {
    next(error)
  }
}
