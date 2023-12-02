import JWT, { JwtPayload } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { createHttpError } from '../errors/createError'
import { dev } from '../config/server'
import User from '../models/userSchema'

interface customerRequest extends Request {
  userId?: string // optional
}

//isLogged in middleware
export const isLoggedIn = async (req: customerRequest, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies.access_token
    if (!accessToken) {
      throw createHttpError(401, ' please login again')
    }

    //check if the token is valid
    const decoded = (await JWT.verify(accessToken, dev.app.ACCESS_TOKEN_SECRET)) as JwtPayload
    console.log(decoded)
    if (!decoded) {
      throw createHttpError(401, 'Access token is not valid')
    }
    req.userId = decoded._id
    next()
  } catch (error) {
    next(error)
  }
}

//isLogged out middleware
export const isLoggedOut = async (req: customerRequest, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies.access_token
    if (accessToken) {
      throw createHttpError(401, 'Hey! you are already logged in')
    }
    req.userId
    next()
  } catch (error) {
    next(error)
  }
}

// isAdmin middleware
export const isAdmin = async (req: customerRequest, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.userId)

    if (user?.isAdmin) {
      next()
    } else {
      throw createHttpError(403, 'Ops! you are not an admin')
    }
  } catch (error) {
    next(error)
  }
}
