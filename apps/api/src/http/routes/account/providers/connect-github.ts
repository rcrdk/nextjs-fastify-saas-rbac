/* eslint-disable prettier/prettier */
import { env } from '@saas/env'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { errors } from '@/errors/messages'
import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../../_errors/bad-request-error'


export async function connectGitHub(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().register(auth).post(
		'/users/accounts/github',
		{
			schema: {
				tags: ['Auth'],
				summary: 'Authenticate with GitHub and connect to current account.',
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
			const githubOAuthURL = new URL('https://github.com/login/oauth/access_token')

			githubOAuthURL.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID)
			githubOAuthURL.searchParams.set('client_secret', env.GITHUB_OAUTH_CLIENT_SECRET)
			githubOAuthURL.searchParams.set('redirect_uri', env.GITHUB_OAUTH_CLIENT_REDIRECT_URI)
			githubOAuthURL.searchParams.set('code', code)

			const githubAccessTokenResponse = await fetch(githubOAuthURL, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
				},
			})

			const githubAccessTokenData = await githubAccessTokenResponse.json()

			const { access_token: GitHubAccessToken } = z
				.object({
					access_token: z.string(),
					token_type: z.literal('bearer'),
					scope: z.string(),
				})
				.parse(githubAccessTokenData)
			
			/**
			* Fetch
			*/
			const githubUserResponse = await fetch('https://api.github.com/user', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${GitHubAccessToken}`,
				},
			})

			const githubUserData = await githubUserResponse.json()

			const { id: githubId } = z
				.object({
					id: z.coerce.number().int().transform(String),
				})
				.parse(githubUserData)
			

			/**
			* Actions
			*/
			const providerAlreadyInUseByUser = await prisma.account.findUnique({
				where: {
					provider_userId: {
						provider: 'GITHUB',
						userId
					}
				}
			})

			if (providerAlreadyInUseByUser) {
				throw new BadRequestError(errors.services.GITHUB_ALREADY_CONNECTED)
			}

			const accountAlreadyInUseBySomeoneElse = await prisma.account.findUnique({
				where: {
					provider_providerAccountId: {
						provider: 'GITHUB',
						providerAccountId: githubId
					}
				}
			})

			if (accountAlreadyInUseBySomeoneElse) {
				throw new BadRequestError(errors.services.GITHUB_ALREADY_CONNECTED_SOMEONE_ELSE)
			}

			await prisma.account.create({
				data: {
					provider: 'GITHUB',
					providerAccountId: githubId,
					userId,
				},
			})

			return reply.status(201).send()
		},
	)
}
