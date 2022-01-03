import express from 'express'
import User from '../models/user-model.js'

const getUser = async (id) => {
  User.findById(id, {email: 1}, (err, doc) => {
    if(err){
      return err
    }
    return doc
  })
}

export default getUser;