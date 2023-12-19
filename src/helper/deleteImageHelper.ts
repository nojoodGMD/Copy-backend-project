import fs from 'fs/promises'

import { createHttpError } from '../errors/createError'

export const deleteImage = async (imagePath: string) => {
  try {
    console.log(imagePath)
    if(imagePath !== './public/images/users/no-profile-img-default.webp'){
      await fs.unlink(imagePath)
    } 
  } catch (error) {
    // if image does not exist, just delete user.
    throw createHttpError(404, 'User is deleted, and no profile/product image was found to delete.')
  }
}
