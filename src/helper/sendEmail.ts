import nodemailer from 'nodemailer'

import { EmailDataType } from '../types'
import { dev } from '../config/server'

//create the transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: dev.app.smtpUserName,
    pass: dev.app.smtpUserPassword,
  },
})

//where to send the email and whats the message config -> send with the help of transport
export const handleSendEmail = async (emailData: EmailDataType) => {
  try {
    const mailOption = {
      from: dev.app.smtpUserName,
      to: emailData.email,
      subject: emailData.subject,
      html: emailData.html,
    }
    const info = await transporter.sendMail(mailOption)
    // the %s for prenting a string or the +
    console.log('Message send: ' + info.response)
  } catch (error) {
    console.error('Error encounterd while sending the email', error)
    throw error
  }
}
