'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { recoverPassword } from '@/http/recover-password'

const recoverPasswordSchema = z
	.object({
		email: z.string().email('Enter a valid e-mail.'),
		code: z.string().uuid('Enter a valid validation code.'),
		password: z.string().min(6, 'Enter a password with at least 6 characters.'),
		password_confirmation: z
			.string()
			.min(6, 'Enter a password with at least 6 characters.'),
	})
	.refine((data) => data.password === data.password_confirmation, {
		message: 'Password confirmation does not match.',
		path: ['password_confirmation'],
	})

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
			message: 'Unexpected error, try again in a few minutes.',
			errors: null,
		}
	}

	return {
		success: true,
		message: null,
		errors: null,
	}
}
