import multer from "multer";

const userStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/users')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix+'.png')
    }
  })

  export const uploadUser = multer({storage : userStorage})