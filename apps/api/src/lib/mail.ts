import { env } from '@saas/env'
import nodemailer from 'nodemailer'

export const emailService = nodemailer.createTransport({
	host: env.MAIL_SMTP_HOST,
	port: env.MAIL_SMTP_PORT,
	secure: true,
	auth: {
		user: env.MAIL_SMTP_EMAIL,
		pass: env.MAIL_SMTP_PASSWORD,
	},
})
