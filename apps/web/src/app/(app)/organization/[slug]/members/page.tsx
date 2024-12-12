import type { Metadata } from 'next'

import { ability, getCurrentOrganization } from '@/auth'
import { getOrganization } from '@/http/organizations/get-organization'

import { Invites } from './invites/invites'
import { MemberList } from './list/members'

export async function generateMetadata(): Promise<Metadata> {
	const currentOrganization = await getCurrentOrganization()

	const { organization } = await getOrganization({
		organizationSlug: currentOrganization!,
	})

	return {
		title: `${organization.name} Members`,
	}
}

export default async function MembersPage() {
	const permissions = await ability()

	return (
		<div className="w-full space-y-6 self-start sm:space-y-8">
			<h1 className="text-2xl font-bold">Members</h1>

			<div className="space-y-6 sm:space-y-8">
				{permissions?.can('get', 'Invite') && <Invites />}
				{permissions?.can('get', 'User') && <MemberList />}
			</div>
		</div>
	)
}
