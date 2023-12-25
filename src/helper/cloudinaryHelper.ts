import {v2 as cloudinary} from 'cloudinary';
import { createHttpError } from '../errors/createError';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

export const uploadToCloudinary = async (image : string, folderName : string) : Promise<String>=> {
    const response = await cloudinary.uploader.upload(image, {folder:folderName})
    return response.secure_url;
}

export const valueWithoutExtension = async (imageULR : string) : Promise<string>=>{
    // Split URL by slashws to get an array of path segmetns
    const pathSegment = imageULR.split('/');

    // Get last name segment
    const lastNameSegment = pathSegment[pathSegment.length - 1];

    // Remove file extension (.jpg) from last segment
    const publicID = lastNameSegment.replace(/\..*$/, '');

    return publicID
}

export const deleteFromCloudinary = async (publicId : string) : Promise<void> =>{
    try {
        const response = await cloudinary.uploader.destroy(publicId)
        if (response.result.toLowerCase() !== 'ok'){
            throw createHttpError(400,'image is not deleted from cloudinary')
        }
        console.log('image deleted from cloudinary successfully')
    } catch (error) {
        console.log('error in deleteFromCloudinary service')
        console.log(error)
    }
}