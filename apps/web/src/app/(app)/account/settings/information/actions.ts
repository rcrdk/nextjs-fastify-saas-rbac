'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

import { updateAccount } from '@/http/account/update-account'
import { errors } from '@/messages/error'
import { success } from '@/messages/success'
import { updateAccountSchema } from '@/schema/update-account-schema'

export async function saveInformationsAction(data: FormData) {
	const result = updateAccountSchema.safeParse(Object.fromEntries(data))

	if (!result.success) {
		const errors = result.error.flatten().fieldErrors
		return { success: false, message: null, errors }
	}

	const { name, email } = result.data

	try {
		await updateAccount({
			name,
			email,
		})

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
		message: success.ACCOUNT_INFORMATION,
		errors: null,
	}
}
