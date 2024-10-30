'use server'

import { revalidateTag } from 'next/cache'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getCurrentOrganization } from '@/auth'
import { shutdownOrganization } from '@/http/organizations/shutdown-organization'
import { success } from '@/messages/success'

export async function shutdownOrganizationAction() {
	const currentOrganization = await getCurrentOrganization()
	const cookieStore = await cookies()

	await shutdownOrganization({ organizationSlug: currentOrganization! })

	cookieStore.set('@SAAS:deletedOrganization', success.ORGANIZATION_SHUTDOWN, {
		expires: new Date().getTime() + (60 * 1000) / 6, // 10s
	})

	revalidateTag('organizations')

	redirect('/')
}
