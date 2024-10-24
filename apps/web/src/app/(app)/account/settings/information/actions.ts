'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { updateAccount } from '@/http/update-account'

const updateAccountSchema = z.object({
	name: z
		.string()
		.refine((value) => value.split(' ').length > 1, 'Enter your full name.'),
	email: z.string().email('Enter a valid e-mail.'),
})

export async function saveAccountInformationsAction(data: FormData) {
	const result = updateAccountSchema.safeParse(Object.fromEntries(data))

	if (!result.success) {
		const errors = result.error.flatten().fieldErrors
		return { success: false, message: null, errors }
	}

	const { name, email } = result.data

	try {
		await updateAccount({
			name,
			email,
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
		message: 'Successfully saved your account informations',
		errors: null,
	}
}
