import express from "express"

import User from "../../models/user-model.js"

const router = express.Router()

router.get("/:id", async (req, res) => {
  User.findById(req.params.id, {
    email: 1,
  })
  .then(user => {
    res.status(200).json({
      email: user.email
    })
  })
  .catch(err => {
    res.status(err.status).json({
      ...err
    })
  })
})

export default router
