// importing user modal
import User from "../models/user-model.js"
import { generatedOTP } from "./otp-generator.js"

const verifyOTP = async (req, res, next) => {
  const { id, email, otp } = req.body
  
  if(otp != generatedOTP) {
    res.status(400).json({
      status: 400,
      message: "Invalid OTP entered"
    })
  } else {
    next()
  }
}

export default verifyOTP
