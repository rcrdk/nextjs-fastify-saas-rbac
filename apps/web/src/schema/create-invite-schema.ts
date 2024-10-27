import { rolesSchema } from '@saas/auth'
import { z } from 'zod'

import { validation } from '@/messages/validation'

export const createInviteSchema = z.object({
	email: z.string().email(validation.VALID_EMAIL),
	role: rolesSchema,
})
