'use server'

import { HTTPError } from 'ky'
import { cookies } from 'next/headers'

import { resendEmailValidationCode } from '@/http/auth/resend-email-validation-code'
import { verifyEmailAndSignIn } from '@/http/auth/verify-email-and-sign-in'
import { acceptInvite } from '@/http/invites/accept-invite'
import { errors } from '@/messages/error'
import { success } from '@/messages/success'
import { resendEmailVerificationSchema } from '@/schema/resend-email-verification-schema'
import { verifyEmailSchema } from '@/schema/verify-email-schema'

export async function verifyEmailAndAuthenticateAction(data: FormData) {
	const result = verifyEmailSchema.safeParse(Object.fromEntries(data))

	if (!result.success) {
		const errors = result.error.flatten().fieldErrors

		return {
			success: false,
			message: null,
			errors,
		}
	}

	const { email, password, code } = result.data

	try {
		const { token } = await verifyEmailAndSignIn({
			email,
			password,
			code,
		})

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

export async function resendEmailValidationCodeAction(data: FormData) {
	const result = resendEmailVerificationSchema.safeParse(
		Object.fromEntries(data),
	)

	if (!result.success) {
		const errorsParsed = result.error.flatten().fieldErrors

		return {
			success: false,
			message: errors.app.VALIDATION,
			errors: errorsParsed,
		}
	}

	const { email } = result.data

	try {
		await new Promise((resolve) => setTimeout(resolve, 1000))

		await resendEmailValidationCode({
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
		message: success.RESENDED,
		errors: null,
	}
}
