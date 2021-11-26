import dotenv from 'dotenv'
import nodemailer from 'nodemailer'

dotenv.config()

export default async (req, res) => {
    const parsed = JSON.parse(req.body)
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    })

    const message = {
        from: 'bginger436@gmail.com',
        to: parsed.receiver,
        subject: 'OTP Verification for offline attendance',
        text: `Please use this code ${parsed.code} for OTP verification. After this, your attendance will be considered`,
    }

    try {
        await transporter.sendMail(message)
        res.status(200).json({ data: 'Mail sent', err: null })
    } catch (err) {
        res.status(500).json({ data: null, err: 'Error occured while sending mail'})
    }
}