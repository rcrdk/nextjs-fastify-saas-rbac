'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

import { removeAccountProvider } from '@/http/account/remove-account-provider'

export async function disconnectGitHubAction() {
	try {
		await removeAccountProvider({ provider: 'GITHUB' })

		revalidateTag('get-profile')
	} catch (error) {
		if (error instanceof HTTPError) {
			const { message } = await error.response.json()
			return { success: false, message, errors: null }
		}

		console.error(error)

		return {
			success: false,
			message: 'Unexpected error, try again in a few minutes',
			errors: null,
		}
	}

	return {
		success: true,
		message: 'Successfully removed GitHub from your account',
		errors: null,
	}
}
