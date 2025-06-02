import nodemailer from 'nodemailer'

export const sendEmail = async (to, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // يمكنك تغييره إذا كنت تستخدم مزود آخر
    auth: {
      user: process.env.EMAIL_USER, // من .env
      pass: process.env.EMAIL_PASS
    }
  })

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  })
}
