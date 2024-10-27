import { z } from 'zod'

import { validation } from '@/messages/validation'

export const formProjectSchema = z.object({
	name: z.string().min(4, validation.FOUR_CHARACTERS),
	description: z.string().min(1, validation.DESCRIPTION),
})

export type FormProjectSchema = z.infer<typeof formProjectSchema>
