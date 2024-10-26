import { env } from '@saas/env'

interface TransferOrganizationEmailTemplateParams {
	organizationName: string
	targetName: string | null
}

export function transferOrganizationOwnershipEmailTemplate({
	organizationName,
	targetName,
}: TransferOrganizationEmailTemplateParams) {
	return `
		<p style="margin:0 0 0.25rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			Hi, ${targetName ? targetName.split(' ').at(0) + '!' : ''}
		</p>
		<p style="margin:0 0 1rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			You have been designated as the new administrator of ${organizationName}. You now have full access to manage organization settings and projects.
		</p>
		<p style="margin:0 0 0.25rem;line-height:1.5;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:14px;">
			Welcome, and congratulations on your new role!
			<br />
			<a href="${env.NEXT_PUBLIC_URL}" style="text-decoration:underline;color:currentColor;">Get it started</a>
		</p>
	`
}
