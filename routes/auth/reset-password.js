import express from 'express'
import bcrypt from 'bcryptjs'

import User from '../../models/user-model.js'
import verifyOTP from '../../middleware/verify-otp.js'
import mail from '../../helpers/mail.js'

const router = express.Router()

router.put('/', verifyOTP, async (req, res) => {
  const { email, newPassword } = req.body

  User.findOneAndUpdate(
    email, 
    {
      $set:{
        password: bcrypt.hashSync(newPassword, 10)
      }
    },
    {
      new: true,
      upsert: true
    }
  )
    .then(user => {
      mail({
        userEmail: email,
        subject: "Reset Password",
        text: `Dear ${user.name}, Your password has been successfully updated`
      })
      res.json({
        status: 200,
        message: "Password Updated Successfully"
      })
    })
    .catch(err => {
      res.status(500).json({
        status: 500,
        message: "Password updation failed"
      })
    })
})

export default router