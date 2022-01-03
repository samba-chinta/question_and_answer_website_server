import mongoose from 'mongoose'

import Answer from './answer-modal.js'

const QuerySchema = mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  link: String,
  info: String,
  // file: String,
  answer: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "answer"
  }]
}, {
  collection: "user_queries",
  timestamps: true
})

const Query = mongoose.model('Query', QuerySchema)

export default Query