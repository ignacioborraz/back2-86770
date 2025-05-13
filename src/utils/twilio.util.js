import twilio from "twilio"
const { TWILIO_SID, TWILIO_TOKEN, TWILIO_PHONE } = process.env

async function twilioUtil(text, userPhone) {
  try {
    const client = twilio(TWILIO_SID, TWILIO_TOKEN)
    await client.messages.create({
      body: text,
      from: TWILIO_PHONE,
      to: userPhone
    })
  } catch (error) {
    throw error
  }
}

export default twilioUtil