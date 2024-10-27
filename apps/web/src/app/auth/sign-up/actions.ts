'use server'

import { HTTPError } from 'ky'

import { signUp } from '@/http/auth/sign-up'
import { errors } from '@/messages/error'
import { signUpSchema } from '@/schema/sign-up-schema'

export async function signUpAction(data: FormData) {
	const result = signUpSchema.safeParse(Object.fromEntries(data))

	if (!result.success) {
		const errors = result.error.flatten().fieldErrors

		return {
			success: false,
			message: null,
			errors,
		}
	}

	const { name, email, password } = result.data

	try {
		await signUp({
			name,
			email,
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
