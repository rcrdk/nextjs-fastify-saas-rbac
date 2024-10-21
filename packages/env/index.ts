/* eslint-disable prettier/prettier */
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	server: {
		DATABASE_URL: z.string(),
		API_SERVER_PORT: z.coerce.number().default(3333),

		JWT_SECRET: z.string(),

		GITHUB_OAUTH_CLIENT_ID: z.string(),
		GITHUB_OAUTH_CLIENT_SECRET: z.string(),
		GITHUB_OAUTH_CLIENT_REDIRECT_URI: z.string().url(),
		GITHUB_OAUTH_CLIENT_SCOPE: z.string().default('user'),

		MAIL_SMTP_HOST: z.string().default('smtp.gmail.com'),
		MAIL_SMTP_PORT: z.coerce.number().default(465),
		MAIL_SMTP_EMAIL: z.string(),
		MAIL_SMTP_PASSWORD: z.string(),
	},

	client: {},

	shared: {
		NEXT_PUBLIC_URL: z.string().url(),
		NEXT_PUBLIC_API_URL: z.string().url(),
	},

	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		API_SERVER_PORT: process.env.API_SERVER_PORT,
		NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
		JWT_SECRET: process.env.JWT_SECRET,
		GITHUB_OAUTH_CLIENT_ID: process.env.GITHUB_OAUTH_CLIENT_ID,
		GITHUB_OAUTH_CLIENT_SECRET: process.env.GITHUB_OAUTH_CLIENT_SECRET,
		GITHUB_OAUTH_CLIENT_REDIRECT_URI: process.env.GITHUB_OAUTH_CLIENT_REDIRECT_URI,
		GITHUB_OAUTH_CLIENT_SCOPE: process.env.GITHUB_OAUTH_CLIENT_SCOPE,
		MAIL_SMTP_HOST: process.env.MAIL_SMTP_HOST,
		MAIL_SMTP_PORT: process.env.MAIL_SMTP_PORT,
		MAIL_SMTP_EMAIL: process.env.MAIL_SMTP_EMAIL,
		MAIL_SMTP_PASSWORD: process.env.MAIL_SMTP_PASSWORD,
	},
	emptyStringAsUndefined: true,
})
