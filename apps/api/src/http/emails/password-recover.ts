import { env } from '@saas/env'
import Mail from 'nodemailer/lib/mailer'

import { emailService } from '@/lib/mail'

import { passwordRecoverEmailTemplate } from './template/password-recover'

interface PasswordRecoverEmailParams {
	name: string | null
	email: string
	code: string
}

export async function passwordRecoverEmail({
	name,
	email,
	code,
}: PasswordRecoverEmailParams) {
	const htmlTemplate = passwordRecoverEmailTemplate({
		name,
		code,
		link: `${env.NEXT_PUBLIC_URL}/auth/recover-password?email=${email}`,
	})

	const emailOptions: Mail.Options = {
		from: env.MAIL_SMTP_EMAIL,
		to: email,
		subject: 'Your Password Recovery Code',
		html: htmlTemplate,
	}

	await emailService.sendMail(emailOptions)
}
