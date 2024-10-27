import { z } from 'zod'

import { validation } from '@/messages/validation'

export const updateAccountSchema = z.object({
	name: z
		.string()
		.refine((value) => value.split(' ').length > 1, validation.FULL_NAME),
	email: z.string().email(validation.VALID_EMAIL),
})
