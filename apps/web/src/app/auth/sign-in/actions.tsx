'use server'

import { HTTPError } from 'ky'
import { z } from 'zod'

import { signInWithPassword } from '@/http/sign-in-with-password'

const signInSchema = z.object({
	email: z.string().email('Provide a valid e-mail.'),
	password: z.string().min(6, 'Provide a password with at least 6 characters.'),
})

export async function signinWithEmailAndPassword(data: FormData) {
	const result = signInSchema.safeParse(Object.fromEntries(data))

	if (!result.success) {
		const errors = result.error.flatten().fieldErrors

		return {
			success: false,
			message: null,
			errors,
		}
	}

	const { email, password } = result.data

	try {
		const { token } = await signInWithPassword({
			email,
			password,
		})

		console.log(token)
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

	return { success: true, message: null, errors: null }
}
