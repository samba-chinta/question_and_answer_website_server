import express from "express";
import bcrypt from "bcryptjs";

// importing user model
import User from "../../models/user-model.js";

const router = express.Router();

// login method
router.post("/", async (req, res) => {
  // extracting email & password from request body
  const { email, password } = req.body;

  // getting user with entered email by using findOne()

  User.findOne({ email })
    // if user exists the database
    .then((user) => {
      if (!bcrypt.compareSync(password, user.password)) {
        res.status(401).json({
          status: 401,
          message: "Invalid Password",
        });
      } else {
        res.status(202).json({
          id: user._id,
          message: "User found",
        });
      }
    })
    // if the entered email is invalid
    .catch((error) => {
      res.status(404).json({
        status: 404,
        message: "Invalid Email",
      });
    });
});

export default router;
