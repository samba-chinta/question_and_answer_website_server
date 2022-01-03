import express from 'express'

import otpGenerator from '../../middleware/otp-generator.js'

const router = express.Router()

router.get('/:email', otpGenerator, (req, res) => {
  res.status(200).json({
    status: 200,
    message: "OTP sent successful"
  })
})

export default router