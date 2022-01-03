import express from 'express';

import Answer from '../../models/answer-modal.js';

const router = express.Router();

router.put('/', async (req, res) => {
  const { answer_id, liked_by } = req.body

  Answer.findByIdAndUpdate(answer_id, {
    $inc: {
      likes: 1,
    },
    $push: {
      likedBy: liked_by,
    }
  }, (err, doc) => {
    if(err) {
      res.status(err.status).json({
        message: "Error Occurred",
      })
    }
    else {
      res.status(200).json({
        message: "Likes Increase",
      })
    }
  })
})

export default router;