import { z } from 'zod'

import { validation } from '@/messages/validation'

export const verifyEmailSchema = z.object({
	email: z.string().email(validation.VALID_EMAIL),
	password: z.string(),
	code: z.string().uuid(validation.VALIDATION_CODE),
})
