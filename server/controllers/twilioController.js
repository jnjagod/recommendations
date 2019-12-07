require('dotenv').config()
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_NUMBER, ADMIN_NUMBER } = process.env
const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)

module.exports = {
  sendAlert: () => {
    client.messages
    .create({
      body: 'A game has been added to TableTimeGaming.com. If this was unauthorized log in and correct it immediately.',
      from: TWILIO_NUMBER,
      to: ADMIN_NUMBER
    })
  }
}