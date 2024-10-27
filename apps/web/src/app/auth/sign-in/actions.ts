'use server'

import { HTTPError } from 'ky'
import { cookies } from 'next/headers'

import { signInWithPassword } from '@/http/auth/sign-in-with-password'
import { acceptInvite } from '@/http/invites/accept-invite'
import { errors } from '@/messages/error'
import { signInSchema } from '@/schema/sign-in-schema'

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
				message: errors.auth.UNVERIFIED_EMAIL,
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
