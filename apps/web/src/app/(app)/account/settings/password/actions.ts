'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { auth } from '@/auth'
import { updateAccountPassword } from '@/http/account/update-account-password'
import { validateStrongPasswordSchema } from '@/schema/helpers/strong-password'

function updatePasswordSchema(hasCurrentPassword: boolean) {
	return z
		.object({
			current_password: hasCurrentPassword
				? z.string().min(1, 'Enter your current password.')
				: z.string().nullish(),
			password: z.string(),
			password_confirmation: z.string(),
		})
		.refine((data) => data.password === data.password_confirmation, {
			message: 'Password confirmation does not match.',
			path: ['password_confirmation'],
		})
		.superRefine(validateStrongPasswordSchema)
}

export async function updatePasswordAction(data: FormData) {
	const { user } = await auth()

	const result = updatePasswordSchema(user.passwordHash).safeParse(
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
			message: 'Unexpected error, try again in a few minutes',
			errors: null,
		}
	}

	return {
		success: true,
		message: 'Successfully changed your account password',
		errors: null,
	}
}
