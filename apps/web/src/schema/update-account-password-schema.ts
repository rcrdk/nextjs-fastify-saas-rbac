import { z } from 'zod'

import { validation } from '@/messages/validation'

import { validateStrongPasswordSchema } from './helpers/validate-strong-password-schema'

export function updateAccountPasswordSchema(hasCurrentPassword: boolean) {
	return z
		.object({
			current_password: hasCurrentPassword
				? z.string().min(1, validation.CURRENT_PASSWORD)
				: z.string().nullish(),
			password: z.string(),
			password_confirmation: z.string(),
		})
		.refine((data) => data.password === data.password_confirmation, {
			message: validation.PASSWORD_CONFIRMATION,
			path: ['password_confirmation'],
		})
		.superRefine(validateStrongPasswordSchema)
}
