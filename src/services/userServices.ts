import { Request } from 'express';

import ApiError from "../errors/ApiError";
import  User from '../models/userSchema';

//GET-> get all users
export const getAllUsersService = async () => {
    const users = await User.find()
    return users
  }

//GET-> get user by id
export const getSingleUserService = async (req: Request) => {
    const id = req.params.id;
    const users = await User.findOne({id:id});
    if (!users) {
        const error = new ApiError(404, `User with this id does not exist.`)
        throw error
    }
    return users
}

// Check if user already exists
export const isUserExistService = async ( req : Request)=>{
    const user = await User.exists({email : req.body.email})
    if(user){
      const error = new ApiError(409,'User with this email already exists.')
      throw error;
    }
}

//create a new user
export const createUserService = async (req: Request)=>{
    isUserExistService(req);
    const {name,email,password,phone} = req.body; 
    const imagePath = req.file?.path;

    const newUser = new User({
        name:name,
        email: email,
        password: password,
        phone: phone,
        image: imagePath,
    })

    await newUser.save();
    return newUser;
}

//delete user
export const deleteUserSevice = async (req : Request)=>{
    const id = req.params.id;
    const user = await User.findOneAndDelete({id:id});
    if(!user){
      const error = new ApiError(404,"User with this id doesn't exist")
      throw error; 
    }

} 

//update user
export const updateUserService = async (req: Request)=>{
    const id = req.params.id; 
    const newData = req.body;
    const user = await User.findOneAndUpdate({id:id},newData,{new:true});
    if(!user){
      const error = new ApiError(404,"User with this id doesn't exist")
      throw error;
    }
    return user;
}