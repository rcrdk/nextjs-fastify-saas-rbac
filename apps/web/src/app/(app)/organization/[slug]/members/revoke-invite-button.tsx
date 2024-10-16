import { IconSendOff } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'

import { revokeInviteAction } from './actions'

interface RevokeInviteButtonProps {
	inviteId: string
}

export async function RevokeInviteButton({
	inviteId,
}: RevokeInviteButtonProps) {
	return (
		<form action={revokeInviteAction.bind(null, inviteId)}>
			<Button className="gap-2" variant="destructive" size="sm">
				<IconSendOff size={20} />
				Revoke invite
			</Button>
		</form>
	)
}
