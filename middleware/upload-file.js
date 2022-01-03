import multer from 'multer'

const upload = multer({
  dest: '../public/files'
})

export default upload