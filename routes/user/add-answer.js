import express from 'express'

import Answer from '../../models/answer-modal.js'
import Query from "../../models/query-model.js"
import mail from '../../helpers/mail.js'
import getUser from '../../helpers/get-user.js'

const router = express.Router()

router.post('/', async (req, res) => {
  
  const { answer, question_id, answered_by, asked_by } = req.body
  let answered_user_email;
  try{
    answered_user_email = await getUser(answered_by)
  }catch(err) {
    console.log(err)
  }
  const newAnswer = {
    answer,
    answered_by
  }

  await Answer.create(newAnswer)
  .then((ans) => {
    Query.findByIdAndUpdate(question_id, {
      $push: {
        answer: ans._id,
      }
    }, {
      new: true,
    }).then(res => {
      mail({
        userEmail: asked_by,
        subject: "Your Question has been answered",
        text: `Your question has been answered by ${answered_user_email.email}  `,
      })
    })
    .catch(err => {})
  })
  .then((ans) => {
    res.status(201).json({
      status: 201,
      message: "Answered the Question"
    })
  })
  .catch(err => {
    res.status(err.status).json({
      status: err.status,
      message: err.message
    })
  })
})

export default router