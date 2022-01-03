import nodemailer from 'nodemailer'

const mail = (payload) => {
  const sender = {
    user: process.env.SENDER_MAIL,
    pass: process.env.SENDER_MAIL_PASSWORD,
  }
  const mailOptions = {
    from: process.env.SENDER_MAIL,
    to: payload.userEmail,
    subject: payload.subject,
    text: payload.text
  }
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: sender,
  }).sendMail(mailOptions, (err, msg) => {
    if (err) {
      console.log(err)
    } 
    if (msg) {
      // return msg
    }
  })
}

export default mail