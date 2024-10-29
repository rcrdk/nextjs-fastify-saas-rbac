'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

import { AccountProviders } from '@/@types/account-providers'
import { removeAccountProvider } from '@/http/account/remove-account-provider'
import { errors } from '@/messages/error'
import { success } from '@/messages/success'

export async function disconnectAction(provider: AccountProviders) {
	try {
		await removeAccountProvider({ provider })

		revalidateTag('get-profile')
	} catch (error) {
		if (error instanceof HTTPError) {
			const { message } = await error.response.json()
			return { success: false, message, errors: null }
		}

		console.error(error)

		return {
			success: false,
			message: errors.app.UNEXPECTED,
			errors: null,
		}
	}

	return {
		success: true,
		message: success.ACCOUNT_REMOVED_PROVIDER,
		errors: null,
	}
}
