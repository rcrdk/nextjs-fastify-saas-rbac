import { IconSendOff } from '@tabler/icons-react'

import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

import { revokeInviteAction } from './actions'

interface RevokeInviteButtonProps {
	inviteId: string
}

export async function RevokeInviteButton({
	inviteId,
}: RevokeInviteButtonProps) {
	return (
		<form action={revokeInviteAction.bind(null, inviteId)}>
			<DropdownMenuItem asChild>
				<button
					type="submit"
					className="cursor-pointer gap-2 disabled:cursor-default"
				>
					<IconSendOff size={20} />
					Revoke invite
				</button>
			</DropdownMenuItem>
		</form>
	)
}
