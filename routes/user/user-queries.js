import express from "express";

import Query from "../../models/query-model.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  const user_id  = req.params.id;

  await Query.find({ user_id }, { createdAt: 0, updatedAt: 0, __v: 0 })
  .populate("answer")
    .then((doc) => {
      res.json({
        message: "User Questions Fetched",
        data: doc
      });
    })
    .catch((err) => {
      res.json({
        status: err.status,
        message: "User Questions Fetched failed",
      });
    });
});

export default router;
