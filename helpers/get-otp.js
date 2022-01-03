const getOtp = () => {
  let otp = ''
  let digits = '0123456789'
  for (let i = 0; i < 6; i++) {
    otp += digits[Math.floor(Math.random()*10)]
  }
  return otp
}

export default getOtp