import 'dotenv/config'

export const dev = {
  app: {
    port: Number(process.env.SERVER_PORT),
    jwtUserActivationkey: process.env.JWT_USER_ACTIVATION_KEY,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    smtpUserName: process.env.SMTP_USERNAME,
    smtpUserPassword: process.env.SMTP_PASSWORD,
    jwtResetPasswordKey: process.env.JWT_RESET_PASSWORD_KEY,
  },
  db: {
    url: process.env.MONGODB_URL,
}}
