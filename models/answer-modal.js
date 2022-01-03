import mongoose from 'mongoose'

const AnswerSchema = mongoose.Schema({
  answer: String,
  answered_by: String,
  likes: {
    type: Number,
    default: 0,
  },
  likedBy: [String]
})

const Answer = mongoose.model('answer', AnswerSchema)

export default Answer