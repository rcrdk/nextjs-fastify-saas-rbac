import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { prisma } from '@/lib/prisma'

import { BadRequestError } from '../_errors/bad-request-error'

export async function authenticateWithGitHub(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().post(
		'/sessions/github',
		{
			schema: {
				tags: ['Auth'],
				summary: 'Authenticate with GitHub.',
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

			const githubOAuthURL = new URL(
				'https://github.com/login/oauth/access_token',
			)

			githubOAuthURL.searchParams.set('client_id', '')
			githubOAuthURL.searchParams.set('client_secret', '')
			githubOAuthURL.searchParams.set('redirect_uri', '')
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

			const githubUserResponse = await fetch('https://api.github.com/user', {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${GitHubAccessToken}`,
				},
			})

			const githubUserData = await githubUserResponse.json()

			const {
				id: githubId,
				name,
				email,
				avatar_url: avatarUrl,
			} = z
				.object({
					id: z.coerce.number().int().transform(String),
					avatar_url: z.string().url(),
					name: z.string().nullable(),
					email: z.string().email().nullable(),
				})
				.parse(githubUserData)

			if (email === null) {
				throw new BadRequestError(
					'Your GitHub account does not have an e-mail to authenticate.',
				)
			}

			let user = await prisma.user.findUnique({
				where: { email },
			})

			if (!user) {
				user = await prisma.user.create({
					data: {
						name,
						email,
						avatarUrl,
					},
				})
			}

			let account = await prisma.account.findUnique({
				where: {
					provider_userId: {
						provider: 'GITHUB',
						userId: user.id,
					},
				},
			})

			if (!account) {
				account = await prisma.account.create({
					data: {
						provider: 'GITHUB',
						providerAccountId: githubId,
						userId: user.id,
					},
				})
			}

			const token = await reply.jwtSign(
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
