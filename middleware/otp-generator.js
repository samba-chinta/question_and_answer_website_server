// importing user modal
import User from "../models/user-model.js"
import getOtp from "../helpers/get-otp.js"
import mail from "../helpers/mail.js"

//global declaration of otp
let otp;

const otpGenerator = async (req, res, next) => {
  const email = req.params.email;
  otp = getOtp()
  console.log(email)
  try{
    const user = await User.findOne({email})

    if(!user) {
      res.json({
        status: 400,
        message: "Invalid Email"
      })
    }

    mail({
      userEmail: email,
      subject: "OTP to reset password",
      text: `OTP: ${otp} `
    })

    next()
  } catch(err) {
    res.json({
      status: err.status,
      message: err.message
    })
  }
}

export {otp as generatedOTP}
export default otpGenerator