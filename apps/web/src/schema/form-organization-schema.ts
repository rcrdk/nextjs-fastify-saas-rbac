import { z } from 'zod'

import { validation } from '@/messages/validation'

export const formOrganizationSchema = z.object({
	name: z.string().min(4, validation.FOUR_CHARACTERS),
})

export type FormOrganizationSchema = z.infer<typeof formOrganizationSchema>
