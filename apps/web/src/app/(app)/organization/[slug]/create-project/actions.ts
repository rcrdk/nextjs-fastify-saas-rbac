'use server'

import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { z } from 'zod'

import { getCurrentOrganization } from '@/auth'
import { createProject } from '@/http/create-project'

const projectSchema = z.object({
	name: z.string().min(4, 'Enter at least 4 characters.'),
	description: z.string().min(1, 'Enter a description.'),
})

export type ProjectSchema = z.infer<typeof projectSchema>

export async function createProjectAction(data: FormData) {
	const result = projectSchema.safeParse(Object.fromEntries(data))

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
			message: 'Unexpected error, try again in a few minutes',
			errors: null,
		}
	}

	return {
		success: true,
		message: 'Successfully saved the project data',
		errors: null,
	}
}
