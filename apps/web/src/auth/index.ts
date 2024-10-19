import { defineAbilityFor } from '@saas/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getMembership } from '@/http/get-membership'
import { getProfile } from '@/http/get-profile'

export function isAuthenticated() {
	return !!cookies().get('@SAAS:token')?.value
}

export function getCurrentOrganization() {
	return cookies().get('@SAAS:organization')?.value ?? null
}

export async function getCurrentMembership() {
	const currentOrganization = getCurrentOrganization()

	if (!currentOrganization) {
		return null
	}

	const { membership } = await getMembership({
		organizationSlug: currentOrganization,
	})

	return membership
}

export async function ability() {
	const memebership = await getCurrentMembership()

	if (!memebership) {
		return null
	}

	const ability = defineAbilityFor({
		id: memebership.userId,
		role: memebership.role,
	})

	return ability
}

export async function auth() {
	const token = cookies().get('@SAAS:token')?.value

	if (!token) {
		redirect('/api/auth/sign-out')
	}

	try {
		const { user } = await getProfile()
		return { user }
	} catch {}

	redirect('/api/auth/sign-out')
}
