import express from "express";

import User from "../../models/user-model.js";

const router = express.Router();

router.get("/:email", async (req, res) => {
  const email = req.params['email']
  
  await User.findOne({ email })
    .then((user) => {
      const { _id, email, name, year, branch, image } = user;
      res.status(200).json({ _id, email, name, year, branch, image });
    })
    .catch((err) => res.status(404).json(err));
});

export default router;
