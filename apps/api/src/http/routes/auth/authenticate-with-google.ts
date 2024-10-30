/* eslint-disable prettier/prettier */
import { env } from '@saas/env'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'


export async function authenticateWithGoogle(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		'/sessions/google',
		{
			schema: {
				tags: ['Auth'],
				summary: 'Authenticate with Google.',
				body: z.object({
					code: z.string(),
				}),
				response: {
					201: z.object({
						token: z.string(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { code } = request.body

			/**
			 * Authorize
			 */
			const googleOAuthURL = new URL('token', 'https://oauth2.googleapis.com')

			googleOAuthURL.searchParams.set('code', code)
			googleOAuthURL.searchParams.set('client_id', env.GOOGLE_OAUTH_CLIENT_ID)
			googleOAuthURL.searchParams.set('client_secret', env.GOOGLE_OAUTH_CLIENT_SECRET)
			googleOAuthURL.searchParams.set('redirect_uri', env.GOOGLE_OAUTH_CLIENT_REDIRECT_URI)
			googleOAuthURL.searchParams.set('grant_type', 'authorization_code') 

			const googleAccessTokenResponse = await fetch(googleOAuthURL, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
				},
			})

			const googleAccessTokenData = await googleAccessTokenResponse.json()

			const { access_token: GoogleAccessToken } = z
				.object({
					access_token: z.string(),
					expires_in: z.coerce.number().int(),
					refresh_token: z.string(),
					scope: z.string(),
					token_type: z.literal('Bearer'),
					id_token: z.string(),
				})
				.parse(googleAccessTokenData)
			
			/**
			 * Fetch
			 */
			const googleUserInfoURL = new URL('oauth2/v3/userinfo', 'https://www.googleapis.com')
			googleUserInfoURL.searchParams.set('access_token', GoogleAccessToken)
			
			const githubUserResponse = await fetch(googleUserInfoURL, {
				method: 'GET',
			})

			const githubUserData = await githubUserResponse.json()

			const {
				sub: googleId,
				name,
				email,
				picture: avatarUrl,
			} = z
				.object({
					sub: z.string(),
					name: z.string(),
					given_name: z.string(),
					picture: z.string(),
					email: z.string().email(),
					email_verified: z.boolean(),
				})
				.parse(githubUserData)

			/**
			 * Actions
			 */
			let token: string

			let account = await prisma.account.findUnique({
				where: {
					provider_providerAccountId: {
						provider: 'GOOGLE',
						providerAccountId: googleId,
					},
				},
			})

			/**
			 * If account already connected, sign-in
			 */
			if (account) {
				token = await reply.jwtSign(
					{
						sub: account.userId,
					},
					{
						expiresIn: '7d',
					},
				)

				return reply.status(201).send({ token })
			}

			/**
			 * If account not connected, sign-in
			 */
			let user = await prisma.user.findUnique({
				where: { email },
			})

			if (!user) {
				user = await prisma.user.create({
					data: {
						name,
						email,
						emailValidatedAt: new Date(),
						avatarUrl,
					},
				})
			}

			account = await prisma.account.findUnique({
				where: {
					provider_userId: {
						provider: 'GOOGLE',
						userId: user.id,
					},
				},
			})

			if (!account) {
				account = await prisma.account.create({
					data: {
						provider: 'GOOGLE',
						providerAccountId: googleId,
						userId: user.id,
					},
				})
			}

			token = await reply.jwtSign(
				{
					sub: user.id,
				},
				{
					expiresIn: '7d',
				},
			)

			return reply.status(201).send({ token })
		},
	)
}
