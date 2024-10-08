import { z } from 'zod'

export const billingSchema = z.object({
	__typename: z.literal('Billing').default('Billing'),
	id: z.string(),
	ownerId: z.string(),
})

export type Billing = z.infer<typeof billingSchema>
