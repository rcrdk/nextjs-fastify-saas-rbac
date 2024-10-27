'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

import { auth } from '@/auth'
import { updateAccountPassword } from '@/http/account/update-account-password'
import { errors } from '@/messages/error'
import { success } from '@/messages/success'
import { updateAccountPasswordSchema } from '@/schema/update-account-password-schema'

export async function updatePasswordAction(data: FormData) {
	const { user } = await auth()

	const result = updateAccountPasswordSchema(user.passwordHash).safeParse(
		Object.fromEntries(data),
	)

	if (!result.success) {
		const errors = result.error.flatten().fieldErrors
		return { success: false, message: null, errors }
	}

	const { current_password: currentPassword, password: newPassword } =
		result.data

	try {
		await updateAccountPassword({
			currentPassword,
			newPassword,
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
		message: success.ACCOUNT_PASSWORD,
		errors: null,
	}
}
