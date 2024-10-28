'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

import { updateAvatar } from '@/http/update-avatar'
import { errors } from '@/messages/error'
import { success } from '@/messages/success'

export async function updateAvatarAction(
	receipientId: string,
	file?: File | null,
) {
	if (!file) {
		return {
			success: false,
			message: errors.files.NOT_FOUND,
			errors: null,
		}
	}

	try {
		const formData = new FormData()

		formData.append('file', file)

		await updateAvatar({
			receipientId,
			receipient: 'USER',
			formData,
		})

		revalidateTag('get-profile')
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
		message: success.ACCOUNT_AVATAR_CHANGED,
		errors: null,
	}
}
