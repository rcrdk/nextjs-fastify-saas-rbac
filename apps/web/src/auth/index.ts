import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { getProfile } from '@/http/get-profile'

export function isAuthenticated() {
	return !!cookies().get('@SAAS:token')?.value
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
