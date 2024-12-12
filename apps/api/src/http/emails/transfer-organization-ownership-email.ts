import { env } from '@saas/env'
import type Mail from 'nodemailer/lib/mailer'

import { emailService } from '@/lib/mail'

import { transferOrganizationOwnershipEmailTemplate } from './template/transfer-organization-ownership-email.template'

interface TransferOrganizationOwnershipParams {
	organizationName: string
	targetName: string
	targetEmail: string
}

export async function transferOrganizationOwnershipEmail({
	organizationName,
	targetName,
	targetEmail,
}: TransferOrganizationOwnershipParams) {
	const htmlTemplate = transferOrganizationOwnershipEmailTemplate({
		targetName,
		organizationName,
	})

	const emailOptions: Mail.Options = {
		from: env.MAIL_SMTP_EMAIL,
		to: targetEmail,
		subject: `${organizationName} Ownership Transfer`,
		html: htmlTemplate,
	}

	await emailService.sendMail(emailOptions)
}
