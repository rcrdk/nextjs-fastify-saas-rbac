import { z } from 'zod'

import { validation } from '@/messages/validation'

export const confirmEmailChangeSchema = z.object({
	code: z.string().uuid(validation.VALIDATION_CODE),
})
