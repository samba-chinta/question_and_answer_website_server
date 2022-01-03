import express from 'express'

import User from '../../models/user-model.js'
import Query from '../../models/query-model.js'
import Answer from '../../models/answer-modal.js'

const router = express.Router()

const getAnswers = async (ansArray) => {
  const decodedAns = []

  for (let i in ansArray) {
    await Answer.find(i, {_id: 0})
    .then(data => {
      decodedAns.push(data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  return decodedAns
}

router.get('/', async (req, res) => {

  await Query.find({}, { createdAt: 0, updatedAt: 0, __v: 0 })
  .populate("answer")
  .then(docs => {
    res.status(200).json({
      status: docs.status,
      message: "Fetched Successfully",
      data: docs
    })
  })
  .catch(err => {
    res.status(400).json({
      status: err.status,
      message: err.message,
    })
  })
})

export default router