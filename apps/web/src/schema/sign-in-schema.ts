import { z } from 'zod'

import { validation } from '@/messages/validation'

export const signInSchema = z.object({
	email: z.string().email(validation.VALID_EMAIL),
	password: z.string().min(1, validation.PASSWORD),
})
