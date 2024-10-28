import { z } from 'zod'

import { validation } from '@/messages/validation'

export const createProjectSchema = z.object({
	name: z.string().min(4, validation.FOUR_CHARACTERS),
	description: z.string().min(1, validation.DESCRIPTION),
})

export type CreateProjectSchema = z.infer<typeof createProjectSchema>
