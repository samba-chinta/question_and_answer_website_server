import express from 'express';

import Answer from '../../models/answer-modal.js';

const router = express.Router();

router.put('/', async (req, res) => {
  const { answer_id } = req.body

  Answer.findByIdAndDelete(answer_id, (err, doc) => {
    if(err){
      res.status(err.status).json({
        message: "deletion failed"
      })
    }
    else {
      res.status(200).json({
        message: "Successfully Deleted"
      })
    }
  })
})

export default router