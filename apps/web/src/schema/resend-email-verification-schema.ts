import { z } from 'zod'

import { validation } from '@/messages/validation'

export const resendEmailVerificationSchema = z.object({
	email: z.string().email(validation.VALID_EMAIL),
})
