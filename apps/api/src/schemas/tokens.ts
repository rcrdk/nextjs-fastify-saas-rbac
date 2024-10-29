import z from 'zod'

export const tokensSchema = z.enum([
	'PASSWORD_RECOVER',
	'EMAIL_VALIDATION',
	'EMAIL_CHANGE_VALIDATION',
])
