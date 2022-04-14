//required libraries
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'

// local routing files
import register from './routes/auth/register.js'
import login from './routes/auth/login.js'
import forgetpassword from './routes/auth/forgot-password.js'
import resetpassword from './routes/auth/reset-password.js'
import profile from './routes/user/profile.js'
import createquery from './routes/user/create-query.js'
import addanswer from './routes/user/add-answer.js'
import queries from './routes/user/queries.js'
import userqueries from './routes/user/user-queries.js'
import getuser from './routes/user/getUser.js'
import deleteanswer from './routes/remove/delete-answer.js'
import deletequery from './routes/remove/delete-question.js'
import deleteuser from './routes/remove/remove-user.js'
import likes from './routes/user/likes.js'
import isliked from './routes/user/is-already-liked.js'

// configuration .env file
dotenv.config()

// initializing the app
const app = express()

// making app to accept json format & 
// support cross-origin
app.use(cors())
app.use(express.json())
// app.use(express.static(`${__dirname}/public`))

// connect app to the MongoDB server
// TODO 1: using connect function to connect to localhost
// then get connection instance to know whether
// connection is established or not

const MONGODB_URL = 
"mongodb+srv://samba:samba@cluster0.0utpe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
const PORT = process.env.PORT || 5000

mongoose.connect(MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const connection = mongoose.connection;

connection.once('connected', () => {
  console.log("Connected to Database")
})

connection.on('error', (err) => {
  console.log("Error occured while connecting to Database")
})

// local routers for different requests
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})
app.use('/queries', queries)
app.use('/register', register)
app.use('/login', login)
app.use('/login/forgetpassword', forgetpassword)
app.use('/login/resetpassword', resetpassword)
app.use('/profile', profile)
app.use('/createquery', createquery)
app.use('/answer', addanswer)
app.use('/userqueries', userqueries)
app.use('/getuser', getuser)
app.use('/deleteanswer', deleteanswer)
app.use('/deletequery', deletequery)
app.use('/deleteuser', deleteuser)
app.use('/likes', likes)
app.use('/isliked', isliked)

app.listen(PORT, () => {
  console.log(`Listening on Port ${PORT}`)
})