'use server'

import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getCurrentOrganization } from '@/auth'
import { shutdownOrganization } from '@/http/organizations/shutdown-organization'

export async function shutdownOrganizationAction() {
	const currentOrganization = await getCurrentOrganization()
	const cookieStore = await cookies()

	await shutdownOrganization({ organizationSlug: currentOrganization! })

	cookieStore.set(
		'@SAAS:deletedOrganization',
		'Your organization was shutted down',
		{
			// eslint-disable-next-line prettier/prettier
			expires: new Date().getTime() + ((60 * 1000) / 4), // 15s
		},
	)

	revalidateTag('organizations')

	redirect('/')
}
