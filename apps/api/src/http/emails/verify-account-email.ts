import { env } from '@saas/env'
import type Mail from 'nodemailer/lib/mailer'

import { emailService } from '@/lib/mail'

import { verifyAccountEmailTemplate } from './template/verify-account-email.template'

interface VerifyAccountEmailParams {
	name: string | null
	email: string
	code: string
}

export async function verifyAccountEmail({
	name,
	email,
	code,
}: VerifyAccountEmailParams) {
	const htmlTemplate = verifyAccountEmailTemplate({
		name,
		code,
		link: `${env.NEXT_PUBLIC_URL}/auth/verify-email?email=${email}&code=${code}`,
	})

	const emailOptions: Mail.Options = {
		from: env.MAIL_SMTP_EMAIL,
		to: email,
		subject: 'Your Account E-mail Verification Code',
		html: htmlTemplate,
	}

	await emailService.sendMail(emailOptions)
}
