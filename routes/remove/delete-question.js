import express from 'express';

import Query from '../../models/answer-modal.js';

const router = express.Router();

router.put('/', async (req, res) => {
  const { qstn_id: _id } = req.body
  // console.log(_id)
  Query.findByIdAndDelete(_id, (err, doc) => {
    if(err){
      res.status(err.status).json({
        message: "deletion failed"
      })
    }
    else {
      console.log(doc)
      res.status(200).json({
        message: "Successfully Deleted"
      })
    }
  })
})

export default router