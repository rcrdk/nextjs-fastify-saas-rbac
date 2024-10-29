/* eslint-disable prettier/prettier */
// @ts-expect-error you ugly import
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	server: {
		DATABASE_URL: z.string(),
		API_SERVER_PORT: z.coerce.number().default(3333),

		JWT_SECRET_KEY: z.string(),
		JWT_PUBLIC_KEY: z.string(),

		GITHUB_OAUTH_CLIENT_ID: z.string(),
		GITHUB_OAUTH_CLIENT_SECRET: z.string(),
		GITHUB_OAUTH_CLIENT_REDIRECT_URI: z.string().url(),
		GITHUB_OAUTH_CLIENT_SCOPE: z.string().default('user'),

		MAIL_SMTP_HOST: z.string().default('smtp.gmail.com'),
		MAIL_SMTP_PORT: z.coerce.number().default(465),
		MAIL_SMTP_EMAIL: z.string(),
		MAIL_SMTP_PASSWORD: z.string(),

		CLOUDFLARE_ACCOUNT_ID: z.string(),
		AWS_ENDPOINT: z.string(),
		AWS_BUCKET: z.string(),
		AWS_REGION: z.string().default('auto'),
		AWS_ACCESS_KEY: z.string(),
		AWS_SECRET_KEY: z.string(),
	},

	client: {},

	shared: {
		NEXT_PUBLIC_URL: z.string().url(),
		NEXT_PUBLIC_API_URL: z.string().url(),
		NEXT_PUBLIC_AWS_URL: z.string(),
	},

	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		API_SERVER_PORT: process.env.API_SERVER_PORT,
		NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
		JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
		JWT_PUBLIC_KEY: process.env.JWT_PUBLIC_KEY,
		GITHUB_OAUTH_CLIENT_ID: process.env.GITHUB_OAUTH_CLIENT_ID,
		GITHUB_OAUTH_CLIENT_SECRET: process.env.GITHUB_OAUTH_CLIENT_SECRET,
		GITHUB_OAUTH_CLIENT_REDIRECT_URI: process.env.GITHUB_OAUTH_CLIENT_REDIRECT_URI,
		GITHUB_OAUTH_CLIENT_SCOPE: process.env.GITHUB_OAUTH_CLIENT_SCOPE,
		MAIL_SMTP_HOST: process.env.MAIL_SMTP_HOST,
		MAIL_SMTP_PORT: process.env.MAIL_SMTP_PORT,
		MAIL_SMTP_EMAIL: process.env.MAIL_SMTP_EMAIL,
		MAIL_SMTP_PASSWORD: process.env.MAIL_SMTP_PASSWORD,
		CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
		AWS_ENDPOINT: process.env.AWS_ENDPOINT,
		AWS_BUCKET: process.env.AWS_BUCKET,
		AWS_REGION: process.env.AWS_REGION,
		AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
		AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
		NEXT_PUBLIC_AWS_URL: process.env.NEXT_PUBLIC_AWS_URL,
	},
	emptyStringAsUndefined: true,
})
