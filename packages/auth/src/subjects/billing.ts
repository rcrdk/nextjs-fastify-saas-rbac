/* eslint-disable prettier/prettier */
import { z } from 'zod'

import { billingSchema } from '../models/billing'

export const billingSubject = z.tuple([
	z.union([
		z.literal('manage'),
		z.literal('get'),
		z.literal('export'),
	]),
	z.union([z.literal('Billing'), billingSchema]),
])

export type BillingSubject = z.infer<typeof billingSubject>
