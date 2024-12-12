import type { Role } from '@saas/auth'

interface CreateInviteEmailTemplateParams {
	authorName: string
	organizationName: string
	role: Role
	acceptLink: string
	rejectLink: string
}

export function createInviteEmailTemplate({
	authorName,
	organizationName,
	role,
	acceptLink,
	rejectLink,
}: CreateInviteEmailTemplateParams) {
	function renderRoleName() {
		switch (role) {
			case 'ADMIN':
				return 'owner'
			case 'MEMBER':
				return 'member'
			case 'BILLING':
				return 'billing member'
		}
	}

	return `
		<p style="margin:0 0 0.25rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			Hi,
		</p>
		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			${authorName} has invited you to join <strong>${organizationName}</strong> as ${renderRoleName()}. We would love to have you as part of our team!
		</p>
		<p style="margin:0 0 0.25rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			To accept the invitation, click the link below:
		</p>
		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			<a href="${acceptLink}" style="text-decoration:underline;color:currentColor;font-weight:bold;">Accept Invite</a>
		</p>
		<p style="margin:0 0 0.25rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			 If you do not wish to join, you can decline the invitation using this link:
		</p>
		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			<a href="${rejectLink}" style="text-decoration:underline;color:currentColor;font-weight:bold;">Reject Invite</a>
		</p>
		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			If you have any questions or need further assistance, feel free to reach out to us.
		</p>
		<p style="margin:0 0 0.25rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			Best regards,
			<br />
			<strong>${organizationName} Team</strong>
		</p>
	`
}
