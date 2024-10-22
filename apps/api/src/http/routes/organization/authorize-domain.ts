import dns from 'node:dns'

import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'

import { prisma } from '@/lib/prisma'

import { auth } from '../../middlewares/auth'
import { BadRequestError } from '../_errors/bad-request-error'

const dnsPromisses = dns.promises

export async function authorizeDomain(app: FastifyInstance) {
	app
		.withTypeProvider<ZodTypeProvider>()
		.register(auth)
		.post(
			'/organization/:slug/domain',
			{
				schema: {
					tags: ['Organizations'],
					summary: 'Check if a domain is verified and save information.',
					security: [{ bearerAuth: [] }],
					params: z.object({
						slug: z.string(),
					}),
					body: z.object({
						domain: z.string(),
						shouldAttachUsersByDomain: z.boolean().optional(),
					}),
					response: {
						204: z.null(),
					},
				},
			},
			async (request, reply) => {
				const { slug: organizationSlug } = request.params
				const { domain, shouldAttachUsersByDomain } = request.body

				const organization = await prisma.organization.findUnique({
					where: {
						slug: organizationSlug,
					},
				})

				if (!organization) {
					throw new BadRequestError('Organization not found')
				}

				const formatedDomain = `_saas.${domain}`

				let checkForDomainTxtRecords = null

				try {
					checkForDomainTxtRecords =
						await dnsPromisses.resolveTxt(formatedDomain)
				} catch (error) {
					throw new BadRequestError('Error checking DNS information')
				}

				const checkForValidValue = checkForDomainTxtRecords
					.flat()
					.find(
						(item) =>
							item.includes('saas-domain-verification') && item.includes('='),
					)

				if (!checkForValidValue) {
					throw new BadRequestError(
						'A valid TXT record was not found in the DNS records',
					)
				}

				const validationIdFromDomain = checkForValidValue.split('=').at(1)!

				if (organization.domainValidationId !== validationIdFromDomain) {
					throw new BadRequestError(
						'A valid TXT record does not match in the DNS records',
					)
				}

				if (domain) {
					const organizationByDomain = await prisma.organization.findFirst({
						where: {
							domain,
							id: {
								not: organization.id,
							},
						},
					})

					if (organizationByDomain) {
						throw new BadRequestError(
							'Another organization with same domain already exists',
						)
					}
				}

				await prisma.organization.update({
					where: {
						id: organization.id,
					},
					data: {
						domain,
						shouldAttachUsersByDomain,
						domainValidatedAt: new Date(),
					},
				})

				reply.status(204).send()
			},
		)
}
