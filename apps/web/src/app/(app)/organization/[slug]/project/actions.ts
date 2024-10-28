'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'

import { getCurrentOrganization } from '@/auth'
import { createProject } from '@/http/projects/create-project'
import { updateProject } from '@/http/projects/update-project'
import { errors } from '@/messages/error'
import { success } from '@/messages/success'
import { createProjectSchema } from '@/schema/create-project-schema'
import { updateProjectSchema } from '@/schema/update-project-schema'

export async function createProjectAction(data: FormData) {
	const result = createProjectSchema.safeParse(Object.fromEntries(data))

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

export async function updateProjectAction(data: FormData) {
	const result = updateProjectSchema.safeParse(Object.fromEntries(data))

	if (!result.success) {
		const errors = result.error.flatten().fieldErrors

		return {
			success: false,
			message: null,
			errors,
		}
	}

	const { id, name, description } = result.data

	try {
		const currentOrganization = await getCurrentOrganization()

		await updateProject({
			organizationSlug: currentOrganization!,
			projectId: id,
			name,
			description,
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
		message: success.PROJECT_UPDATED,
		errors: null,
	}
}
