'use server'

import { HTTPError } from 'ky'

import { recoverPassword } from '@/http/auth/recover-password'
import { errors } from '@/messages/error'
import { recoverPasswordSchema } from '@/schema/recover-password-schema'

export async function recoverPasswordAction(data: FormData) {
	const result = recoverPasswordSchema.safeParse(Object.fromEntries(data))

	if (!result.success) {
		const errors = result.error.flatten().fieldErrors

		return {
			success: false,
			message: null,
			errors,
		}
	}

	const { email, code, password } = result.data

	try {
		await recoverPassword({
			email,
			code,
			password,
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
