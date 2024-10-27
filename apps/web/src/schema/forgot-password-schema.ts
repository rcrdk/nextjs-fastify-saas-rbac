import { z } from 'zod'

import { validation } from '@/messages/validation'

export const forgotPasswordSchema = z.object({
	email: z.string().email(validation.VALID_EMAIL),
})
