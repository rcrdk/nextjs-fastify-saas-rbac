import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { env } from '@saas/env'
import { fastify } from 'fastify'
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { errorHandler } from './error-handler'
import { getProfile } from './routes/account/get-profile'
import { leaveOrganization } from './routes/account/leave-organization'
import { removeAccountProvider } from './routes/account/remove-provider'
import { updateAccount } from './routes/account/update-account'
import { updatePassword } from './routes/account/update-password'
import { authenticateWithGitHub } from './routes/auth/authenticate-with-github'
import { authenticateWithPassword } from './routes/auth/authenticate-with-password'
import { createAccount } from './routes/auth/create-account'
import { requestPasswordRecover } from './routes/auth/request-password-recover'
import { resendEmailValidationCode } from './routes/auth/resend-email-validation-code'
import { resetPassword } from './routes/auth/reset-password'
import { verifyEmailAndAuthenticate } from './routes/auth/verify-email-and-authenticate'
import { getOrganizationBilling } from './routes/billing/get-organization-billing'
import { acceptInvite } from './routes/invites/accept-invite'
import { createInvite } from './routes/invites/create-invite'
import { getInvite } from './routes/invites/get-invite'
import { getInvites } from './routes/invites/get-invites'
import { getPendingInvites } from './routes/invites/get-pending-invites'
import { rejectInvite } from './routes/invites/reject-invite'
import { revokeInvite } from './routes/invites/revoke-invite'
import { getMembers } from './routes/members/get-members'
import { removeMember } from './routes/members/remove-member'
import { updateMember } from './routes/members/update-member'
import { authorizeDomain } from './routes/organization/authorize-domain'
import { creteOrganization } from './routes/organization/create-organization'
import { getMemebership } from './routes/organization/get-membership'
import { getOrganization } from './routes/organization/get-organization'
import { getOrganizations } from './routes/organization/get-organizations'
import { removeDomain } from './routes/organization/remove-domain'
import { shutdownOrganization } from './routes/organization/shutdown-organization'
import { transferOrganization } from './routes/organization/transfer-organization'
import { updateOrganization } from './routes/organization/update-organization'
import { createProject } from './routes/projects/create-project'
import { deleteProject } from './routes/projects/delete-project'
import { getProject } from './routes/projects/get-project'
import { getProjects } from './routes/projects/get-projects'
import { updateProject } from './routes/projects/update-project'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)
app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: 'Next.js Fastify Saas RBAC',
			description: 'Full-stack SaaS app with multi-tenant and RBAC.',
			version: '1.0.0',
		},
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
		},
	},
	transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
	routePrefix: '/docs',
})

app.register(fastifyCors)

app.register(fastifyJwt, {
	secret: env.JWT_SECRET,
})

app.register(createAccount)
app.register(authenticateWithPassword)
app.register(authenticateWithGitHub)
app.register(requestPasswordRecover)
app.register(resetPassword)
app.register(verifyEmailAndAuthenticate)
app.register(resendEmailValidationCode)

app.register(getProfile)
app.register(updateAccount)
app.register(updatePassword)
app.register(removeAccountProvider)
app.register(leaveOrganization)

app.register(creteOrganization)
app.register(getMemebership)
app.register(getOrganizations)
app.register(getOrganization)
app.register(updateOrganization)
app.register(shutdownOrganization)
app.register(transferOrganization)
app.register(authorizeDomain)
app.register(removeDomain)

app.register(getMembers)
app.register(updateMember)
app.register(removeMember)

app.register(createInvite)
app.register(getInvites)
app.register(getInvite)
app.register(acceptInvite)
app.register(rejectInvite)
app.register(revokeInvite)
app.register(getPendingInvites)

app.register(getOrganizationBilling)

app.register(createProject)
app.register(deleteProject)
app.register(getProject)
app.register(getProjects)
app.register(updateProject)

app
	.listen({
		port: env.API_SERVER_PORT,
	})
	.then(() => console.log('✅ HTTP server is running.'))
