import { Metadata } from 'next'

import { ability } from '@/auth'

import { Invites } from './invites'
import { MemberList } from './member-list'

export const metadata: Metadata = {
	title: 'Members of [Organization]',
}

export default async function MembersPage() {
	const permissions = await ability()

	return (
		<div className="w-full space-y-8">
			<h1 className="text-2xl font-bold">Members</h1>

			<div className="space-y-8">
				{permissions?.can('get', 'Invite') && <Invites />}
				{permissions?.can('get', 'User') && <MemberList />}
			</div>
		</div>
	)
}
