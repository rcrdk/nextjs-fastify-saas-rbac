'use server'

import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { z } from 'zod'

import { acceptInvite } from '@/http/accept-invite'
import { signInWithPassword } from '@/http/sign-in-with-password'

const signInSchema = z.object({
	email: z.string().email('Enter a valid e-mail.'),
	password: z.string().min(1, 'Enter your password.'),
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
		const { token, emailValidatedAt } = await signInWithPassword({
			email,
			password,
		})

		if (!emailValidatedAt) {
			return {
				success: false,
				message: 'You must have a verified e-mail to access your account.',
				errors: null,
			}
		}

		const cookieStore = await cookies()

		cookieStore.set('@SAAS:token', token, {
			maxAge: 60 * 60 * 24 * 7, // 7d
			path: '/',
		})

		const inviteId = cookieStore.get('@SAAS:inviteId')?.value

		if (inviteId) {
			try {
				await acceptInvite({ inviteId })
				cookieStore.delete('@SAAS:inviteId')
			} catch {}
		}
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
