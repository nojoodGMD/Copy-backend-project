import fs from 'fs/promises'

export const deleteImage = async (imagePath: string) => {
  try {
    await fs.unlink(imagePath)
    console.log('image deleted')
  } catch (error) {
    console.log('error deleting')
    throw error
  }
}
