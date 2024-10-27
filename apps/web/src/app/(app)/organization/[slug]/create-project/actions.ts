'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

import { getCurrentOrganization } from '@/auth'
import { createProject } from '@/http/projects/create-project'
import { errors } from '@/messages/error'
import { success } from '@/messages/success'
import { formProjectSchema } from '@/schema/form-project-schema'

export async function createProjectAction(data: FormData) {
	const result = formProjectSchema.safeParse(Object.fromEntries(data))

	if (!result.success) {
		const errors = result.error.flatten().fieldErrors

		return {
			success: false,
			message: null,
			errors,
		}
	}

	const { name, description } = result.data

	try {
		const currentOrganization = await getCurrentOrganization()

		await createProject({
			organization: currentOrganization!,
			name,
			description,
		})

		revalidateTag(`${currentOrganization}/projects`)
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
		message: success.PROJECT_CREATED,
		errors: null,
	}
}
