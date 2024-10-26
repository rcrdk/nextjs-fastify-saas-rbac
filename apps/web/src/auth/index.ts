import { defineAbilityFor } from '@saas/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getMembership } from '@/http/account/get-membership'
import { getProfile } from '@/http/account/get-profile'

export async function isAuthenticated() {
	const cookieStore = await cookies()

	return !!cookieStore.get('@SAAS:token')?.value
}

export async function getCurrentOrganization() {
	const cookieStore = await cookies()

	return cookieStore.get('@SAAS:organization')?.value ?? null
}

export async function getCurrentMembership() {
	const currentOrganization = await getCurrentOrganization()

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
	const cookieStore = await cookies()

	const token = cookieStore.get('@SAAS:token')?.value

	if (!token) {
		redirect('/api/auth/sign-out')
	}

	try {
		const { user } = await getProfile()
		return { user }
	} catch {}

	redirect('/api/auth/sign-out')
}
