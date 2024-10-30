import z from 'zod'

export const accountProvidersSchema = z.enum(['GITHUB', 'GOOGLE'])
