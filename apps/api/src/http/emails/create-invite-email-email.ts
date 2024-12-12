import type { Role } from '@saas/auth'
import { env } from '@saas/env'
import type Mail from 'nodemailer/lib/mailer'

import { emailService } from '@/lib/mail'

import { createInviteEmailTemplate } from './template/create-invite-email.template'

interface CreateEmailParams {
	inviteId: string
	authorName: string
	organizationName: string
	role: Role
	targetEmail: string
}

export async function createInviteEmail({
	inviteId,
	authorName,
	organizationName,
	role,
	targetEmail,
}: CreateEmailParams) {
	const htmlTemplate = createInviteEmailTemplate({
		authorName,
		organizationName,
		role,
		acceptLink: `${env.NEXT_PUBLIC_URL}/invite/${inviteId}`,
		rejectLink: `${env.NEXT_PUBLIC_URL}/invite/${inviteId}/decline`,
	})

	const emailOptions: Mail.Options = {
		from: env.MAIL_SMTP_EMAIL,
		to: targetEmail,
		subject: `Invitation to Join ${organizationName}`,
		html: htmlTemplate,
	}

	await emailService.sendMail(emailOptions)
}
