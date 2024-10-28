import { z } from 'zod'

import { validation } from '@/messages/validation'

export const updateProjectSchema = z.object({
	id: z.string().uuid(validation.VALID_UUID),
	name: z.string().min(4, validation.FOUR_CHARACTERS),
	description: z.string().min(1, validation.DESCRIPTION),
})

export type UpdateProjectSchema = z.infer<typeof updateProjectSchema>
