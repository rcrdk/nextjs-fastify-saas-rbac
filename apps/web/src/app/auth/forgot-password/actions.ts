'use server'

import { HTTPError } from 'ky'

import { requestNewPassword } from '@/http/auth/request-new-password'
import { errors } from '@/messages/error'
import { forgotPasswordSchema } from '@/schema/forgot-password-schema'

export async function forgotPasswordAction(data: FormData) {
	const result = forgotPasswordSchema.safeParse(Object.fromEntries(data))

	if (!result.success) {
		const errors = result.error.flatten().fieldErrors

		return {
			success: false,
			message: null,
			errors,
		}
	}

	const { email } = result.data

	try {
		await requestNewPassword({
			email,
		})
	} catch (error) {
		if (error instanceof HTTPError) {
			const { message } = await error.response.json()

			return {
				success: false,
				message,
				errors: null,
			}
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
		message: null,
		errors: null,
	}
}
