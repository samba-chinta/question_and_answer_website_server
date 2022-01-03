import express from "express"
import bcrypt from "bcryptjs"

// importing User modal to create users
import User from "../../models/user-model.js"
import mail from "../../helpers/mail.js"

const router = express.Router()

// users registration
router.post("/", async (req, res) => {
  // destructing the request body to extract the details
  const { email, password, name, branch, year } = req.body

  // using findOne() to check whether there
  // exists a user with same email
  // if exists sending 403 error code
  await User.findOne({ email }).catch((err) => {
    res.json({
      status: 403,
      message: err.message,
    })
  })

  // else creating a newuser with defined schema
  // using create() to create the users
  const newUser = {
    email,
    password: bcrypt.hashSync(password, 10),
    name,
    branch,
    year,
  }

  await User.create(newUser)
    .then((user) => {
      mail({
        userEmail: email,
        subject: "Welcome!",
        text: `Welcome ${name}, you are successfully registered for College Quora  `,
      })
      res.status(201).json({
        status: 201,
        message: "Successfully Registered",
        id: user._id,
      })
    })
    .catch((err) => {
      res.status(400).json({
        status: 400,
        message: err.message,
      })
    })
})

export default router;
