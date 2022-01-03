// creating the user modal using mongoose
// * users details to be stored in this schema
// * email, password, name, branch, year

import mongoose from 'mongoose'

import Query from './query-model.js'

const format = {
  type: String,
  required: true,
}

const userSchema = mongoose.Schema({
  email: {
    ...format,
    unique: true,
  },
  password: format,
  name: format,
  branch: format,
  year: {
    type: Number,
    default: 1,
  },
  image: {
    type: String,
    default: "https://i.stack.imgur.com/34AD2.jpg",
  },
  createdOn: {
    type: Date,
    default: Date.now(),
  }
}, {
  collection: "miniproject_users",
})

const User = mongoose.model('User', userSchema)

export default User