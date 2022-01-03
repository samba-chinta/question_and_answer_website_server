import express from 'express';

import Answer from "../../models/answer-modal.js";

const router = express.Router();

router.get('/:email/:id', async (req, res) => {
  const liked_by = req.params.email
  const answer_id = req.params.id

  Answer.findById(answer_id, {likedBy: 1}, (err, doc) => {
    if(err) {
      console.log(err)
    }
    if(doc.likedBy.includes(liked_by)){
      res.status(203).json({
        isLiked: true
      })
    }
    res.status(200).json({
      isLiked: false
    })
  })
})

export default router