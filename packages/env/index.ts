/* eslint-disable prettier/prettier */
// @ts-expect-error you ugly import
import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	server: {
		DATABASE_URL: z.string(),
		PORT: z.coerce.number().default(3333),

		JWT_SECRET_KEY: z.string(),
		JWT_PUBLIC_KEY: z.string(),

		GITHUB_OAUTH_CLIENT_ID: z.string(),
		GITHUB_OAUTH_CLIENT_SECRET: z.string(),
		GITHUB_OAUTH_CLIENT_REDIRECT_URI: z.string().url(),
		GITHUB_OAUTH_CLIENT_SCOPE: z.string().default('user'),

		GOOGLE_OAUTH_CLIENT_ID: z.string(),
		GOOGLE_OAUTH_CLIENT_SECRET: z.string(),
		GOOGLE_OAUTH_CLIENT_REDIRECT_URI: z.string().url(),
		GOOGLE_OAUTH_CLIENT_RESPONSE_TYPE: z.string().default('code'),
		GOOGLE_OAUTH_CLIENT_SCOPE: z.string().default('https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'),

		MAIL_SMTP_HOST: z.string().default('smtp.gmail.com'),
		MAIL_SMTP_PORT: z.coerce.number().default(465),
		MAIL_SMTP_EMAIL: z.string(),
		MAIL_SMTP_PASSWORD: z.string(),

		CLOUDFLARE_ACCOUNT_ID: z.string(),
		CLOUDFLARE_ENDPOINT: z.string(),
		CLOUDFLARE_BUCKET: z.string(),
		CLOUDFLARE_REGION: z.string().default('auto'),
		CLOUDFLARE_ACCESS_KEY: z.string(),
		CLOUDFLARE_SECRET_KEY: z.string(),
	},

	client: {},

	shared: {
		NEXT_PUBLIC_URL: z.string().url(),
		NEXT_PUBLIC_API_URL: z.string().url(),
		NEXT_PUBLIC_CLOUDFLARE_URL: z.string(),
	},

	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		PORT: process.env.PORT,
		NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
		NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
		JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
		JWT_PUBLIC_KEY: process.env.JWT_PUBLIC_KEY,
		GITHUB_OAUTH_CLIENT_ID: process.env.GITHUB_OAUTH_CLIENT_ID,
		GITHUB_OAUTH_CLIENT_SECRET: process.env.GITHUB_OAUTH_CLIENT_SECRET,
		GITHUB_OAUTH_CLIENT_REDIRECT_URI: process.env.GITHUB_OAUTH_CLIENT_REDIRECT_URI,
		GITHUB_OAUTH_CLIENT_SCOPE: process.env.GITHUB_OAUTH_CLIENT_SCOPE,
		GOOGLE_OAUTH_CLIENT_ID: process.env.GOOGLE_OAUTH_CLIENT_ID,
		GOOGLE_OAUTH_CLIENT_SECRET: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
		GOOGLE_OAUTH_CLIENT_REDIRECT_URI: process.env.GOOGLE_OAUTH_CLIENT_REDIRECT_URI,
		GOOGLE_OAUTH_CLIENT_RESPONSE_TYPE: process.env.GOOGLE_OAUTH_CLIENT_RESPONSE_TYPE,
		GOOGLE_OAUTH_CLIENT_SCOPE: process.env.GOOGLE_OAUTH_CLIENT_SCOPE,
		MAIL_SMTP_HOST: process.env.MAIL_SMTP_HOST,
		MAIL_SMTP_PORT: process.env.MAIL_SMTP_PORT,
		MAIL_SMTP_EMAIL: process.env.MAIL_SMTP_EMAIL,
		MAIL_SMTP_PASSWORD: process.env.MAIL_SMTP_PASSWORD,
		CLOUDFLARE_ACCOUNT_ID: process.env.CLOUDFLARE_ACCOUNT_ID,
		CLOUDFLARE_ENDPOINT: process.env.CLOUDFLARE_ENDPOINT,
		CLOUDFLARE_BUCKET: process.env.CLOUDFLARE_BUCKET,
		CLOUDFLARE_REGION: process.env.CLOUDFLARE_REGION,
		CLOUDFLARE_ACCESS_KEY: process.env.CLOUDFLARE_ACCESS_KEY,
		CLOUDFLARE_SECRET_KEY: process.env.CLOUDFLARE_SECRET_KEY,
		NEXT_PUBLIC_CLOUDFLARE_URL: process.env.NEXT_PUBLIC_CLOUDFLARE_URL,
	},
	emptyStringAsUndefined: true,
})
