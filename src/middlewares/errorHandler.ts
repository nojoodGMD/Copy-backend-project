import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiError'

const apiErrorHandler = (err: typeof ApiError, req: Request, res: Response, next: NextFunction) => {
  console.log("inside api error handler: ",err)
  if (err instanceof ApiError) {
    res.status(err.code).json({ msg: err.message })
    return
  }
  res.status(500).json({ msg: 'Something went wrong.' })

}

export default apiErrorHandler
