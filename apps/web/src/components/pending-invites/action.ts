'use server'

import { revalidateTag } from 'next/cache'

import { acceptInvite } from '@/http/invites/accept-invite'
import { rejectInvite } from '@/http/invites/reject-invite'

export async function acceptInviteAction(inviteId: string) {
	await acceptInvite({ inviteId })

	revalidateTag('organizations')
}

export async function rejectInviteAction(inviteId: string) {
	await rejectInvite({ inviteId })
}
