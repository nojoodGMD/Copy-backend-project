import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'
import User from '../models/userSchema'
import { createHttpError } from '../errors/createError'
import { dev } from '../config/server'

export const handleLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1- email and password are required for login
    const { email, password } = req.body

    const user = await User.findOne({ email: email })

    //2- check if user exit
    if (!user) {
      throw createHttpError(404, 'Invalid email or password')
    }

    //3- compare password is correct for login with bcrypt
    // const isMatch = await bcrypt.compare(password, user.password)
    // if (!isMatch) {
    //   throw createHttpError(401, 'password does not match')
    // }

    //4- check user is active or not
    if (user.isBanned) {
      throw createHttpError(401, 'User is banned')
    }

    //5- create access token
    const accessToken = JWT.sign({ _id: user._id }, dev.app.ACCESS_TOKEN_SECRET, {
      expiresIn: '1h',
    })

    // 6- create cookie and put the access token in it
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


// logout the user and clear the cookie

export const handleLogout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie('access_token')  //this is key for the cookie that will be cleared
    res.send({
      message: 'logout success',
    })
  } catch (error) {
    next(error)
  }
}