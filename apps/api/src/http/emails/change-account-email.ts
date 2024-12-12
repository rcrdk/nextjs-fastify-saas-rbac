import { env } from '@saas/env'
import type Mail from 'nodemailer/lib/mailer'

import { emailService } from '@/lib/mail'

import { changeAccountEmailTemplate } from './template/change-account-email.template'

interface ChangeAccountEmailParams {
	name: string | null
	oldEmail: string
	newEmail: string
	code: string
}

export async function changeAccountEmail({
	name,
	oldEmail,
	newEmail,
	code,
}: ChangeAccountEmailParams) {
	const htmlTemplate = changeAccountEmailTemplate({
		name,
		code,
		oldEmail,
		newEmail,
		link: `${env.NEXT_PUBLIC_URL}/account/settings`,
	})

	const emailOptions: Mail.Options = {
		from: env.MAIL_SMTP_EMAIL,
		to: newEmail,
		subject: 'Your New Account E-mail Verification Code',
		html: htmlTemplate,
	}

	await emailService.sendMail(emailOptions)
}
