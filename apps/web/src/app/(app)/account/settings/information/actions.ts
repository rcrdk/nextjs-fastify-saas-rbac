'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

import { cancelEmailChange } from '@/http/account/cancel-email-change'
import { confirmEmailChange } from '@/http/account/confirm-email-change'
import { updateAccount } from '@/http/account/update-account'
import { errors } from '@/messages/error'
import { success } from '@/messages/success'
import { confirmEmailChangeSchema } from '@/schema/confirm-email-change-schema'
import { updateAccountSchema } from '@/schema/update-account-schema'

export async function saveInformationsAction(data: FormData) {
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
		revalidateTag('account-email')
	} catch (error) {
		if (error instanceof HTTPError) {
			const { message } = await error.response.json()
			return { success: false, message, errors: null }
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
		message: success.ACCOUNT_INFORMATION,
		errors: null,
	}
}

export async function cancelEmailChangeAction() {
	try {
		await cancelEmailChange()

		revalidateTag('account-email')
	} catch (error) {
		if (error instanceof HTTPError) {
			const { message } = await error.response.json()
			return { success: false, message, errors: null }
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
		message: success.ACCOUNT_EMAIL_CHANGE_CANCELLED,
		errors: null,
	}
}

export async function confirmEmailChangeAction(data: FormData) {
	const result = confirmEmailChangeSchema.safeParse(Object.fromEntries(data))

	if (!result.success) {
		const errors = result.error.flatten().fieldErrors
		return { success: false, message: null, errors }
	}

	const { code } = result.data

	try {
		await confirmEmailChange({
			code,
		})

		revalidateTag('get-profile')
		revalidateTag('account-email')
	} catch (error) {
		if (error instanceof HTTPError) {
			const { message } = await error.response.json()
			return { success: false, message, errors: null }
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
		message: success.ACCOUNT_EMAIL_CHANGE,
		errors: null,
	}
}
