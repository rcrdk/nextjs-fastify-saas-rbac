/* eslint-disable prettier/prettier */
import { env } from '@saas/env'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { errors } from '@/errors/messages'
import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../../_errors/bad-request-error'


export async function connectGoogle(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().register(auth).post(
		'/users/accounts/google',
		{
			schema: {
				tags: ['Auth'],
				summary: 'Authenticate with Google and connect to current account.',
				security: [{ bearerAuth: [] }],
				body: z.object({
					code: z.string(),
				}),
			},
		},
		async (request, reply) => {
			const userId = await request.getCurrentUserId()

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
			const providerAlreadyInUseByUser = await prisma.account.findUnique({
				where: {
					provider_userId: {
						provider: 'GOOGLE',
						userId
					}
				}
			})

			if (providerAlreadyInUseByUser) {
				throw new BadRequestError(errors.services.GOOGLE_ALREADY_CONNECTED)
			}

			const accountAlreadyInUseBySomeoneElse = await prisma.account.findUnique({
				where: {
					provider_providerAccountId: {
						provider: 'GOOGLE',
						providerAccountId: googleId
					}
				}
			})

			if (accountAlreadyInUseBySomeoneElse) {
				throw new BadRequestError(errors.services.GOOGLE_ALREADY_CONNECTED_SOMEONE_ELSE)
			}

			await prisma.account.create({
				data: {
					provider: 'GOOGLE',
					providerAccountId: googleId,
					userId,
				},
			})

			return reply.status(201).send()
		},
	)
}
