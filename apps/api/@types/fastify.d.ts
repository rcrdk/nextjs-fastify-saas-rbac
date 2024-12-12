import 'fastify'

import type { Member, Organization } from '@prisma/client'

interface GetCurrentUserMembership {
	organization: Organization
	membership: Member
}

declare module 'fastify' {
	export interface FastifyRequest {
		getCurrentUserId(): Promise<string>
		getCurrentUserMembership(slug: string): Promise<GetCurrentUserMembership>
	}
}
