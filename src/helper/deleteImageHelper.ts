import fs from 'fs/promises'

import { createHttpError } from '../errors/createError'

export const deleteImage = async (imagePath: string) => {
  try {
    console.log(imagePath)
    if(imagePath !== 'https://res.cloudinary.com/dods1atmt/image/upload/v1703209056/usersProfile/b3uwotyohfxfjcrghbxe.webp'){
      await fs.unlink(imagePath)
    } 
  } catch (error) {
    // if image does not exist, just delete user.
    throw createHttpError(404, 'User is deleted, and no profile/product image was found to delete.')
  }
}
