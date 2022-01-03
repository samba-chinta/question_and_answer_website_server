import express from "express"

import Query from "../../models/query-model.js"
// import upload from "../../middleware/upload-file.js"

const router = express.Router()

router.post('/', async (req, res) => {
  const { user_id, question, tags, link, info } = req.body

  let tags_array = []

  for (let tag of tags.split(' ')) {
    tags_array.push(tag)
  }

  const query = { user_id, question,tags: tags_array, link, info }

  await Query.create(query)
    .then((query) => {
      res.status(201).json({
        status: 201,
        message: "Question Successfully posted",
        id: query._id,
      })
    })
    .catch((err) => {
      res.status(400).json({
        status: 400,
        message: err.message,
      })
    })
})

export default router