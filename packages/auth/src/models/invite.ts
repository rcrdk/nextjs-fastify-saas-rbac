import { z } from 'zod'

export const inviteSchema = z.object({
	__typename: z.literal('Invite').default('Invite'),
	id: z.string(),
	ownerId: z.string(),
})

export type Invite = z.infer<typeof inviteSchema>
