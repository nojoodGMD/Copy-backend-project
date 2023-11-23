import { Request, Response, NextFunction } from 'express'

import User from '../models/userSchema'
import { createHttpError } from '../errors/createError'
import ApiError from '../errors/ApiError'


export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: 'All users are fetched successfully!',
      payload: users
    })
  } catch (error) {
    next(error)
  }
}

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({id:id});
    if(!user){
      const error = new ApiError(404,"User with this id doesn't exist")
      throw error;
    }
    res.status(200).json({
      message: 'users is returned successfully!',
      payload: user
    })
  } catch (error) {
    next(error)
  }
}

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //Check user already exist or not
    const isUserExist = await User.exists({email : req.body.email})
    if(isUserExist){
      const error = new ApiError(409,'User with this email already exists.')
      throw error;
    }
    const {name,email,password,phone} = req.body; 
    const imagePath = req.file?.path;

    const newUser = new User({
        name:name,
        email: email,
        password: password,
        phone: phone,
        image: imagePath,
    })

    //Activate the user

    //Register the user
    await newUser.save();

    res.status(201).json({
      message: 'user is registered successfully',
    })
  } catch (error) {
    next(error)
  }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const newData = req.body;
    const user = await User.findOneAndUpdate({id:id},newData,{new:true});
    if(!user){
      const error = new ApiError(404,"User with this id doesn't exist")
      throw error;
    }
    res.status(200).json({
      message: 'users is updated successfully!',
      payload: user
    })
  } catch (error) {
    next(error)
  }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = req.params.id;
    const user = await User.findOneAndDelete({id:id});
    if(!user){
      const error = new ApiError(404,"User with this id doesn't exist")
      throw error;
    }
    res.status(200).json({
      message: 'users is deleted successfully!',
    })
  } catch (error) {
    next(error)
  }
}
