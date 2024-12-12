'use client'

import {
	IconDotsVertical,
	IconTransitionTop,
	IconUserMinus,
	IconUserShield,
} from '@tabler/icons-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { GetMembersItemResponse } from '@/http/members/get-members'
import type { GetOrganizationItemRequest } from '@/http/organizations/get-organization'

import { RemoveMemberDialog } from './remove-member-dialog'
import { TransferOwnershipDialog } from './transfer-organization-dialog'
import { UpdateMemberRoleDialog } from './update-member-role-dialog'

interface MembersDropdownActionsProps {
	permissions: {
		canTransferOwnership: boolean
		canRemoveMember: boolean
		canChangeRole: boolean
	}
	organization: GetOrganizationItemRequest
	member: GetMembersItemResponse
}

export function MembersDropdownActions({
	permissions: { canChangeRole, canRemoveMember, canTransferOwnership },
	organization,
	member,
}: MembersDropdownActionsProps) {
	const [dialogRemovalVisible, setDialogRemovalVisible] = useState(false)
	const [dialogRoleVisible, setDialogRoleVisible] = useState(false)
	const [dialogTransferVisible, setDialogTransferVisible] = useState(false)

	function handleToggleRemoveVisibility() {
		setDialogRemovalVisible((prev) => !prev)
	}

	function handleToggleRoleVisibility() {
		setDialogRoleVisible((prev) => !prev)
	}

	function handleToggleTransferVisibility() {
		setDialogTransferVisible((prev) => !prev)
	}

	const isOwner = member.userId === organization.ownerId

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="icon" className="size-8">
						<IconDotsVertical size={20} />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end">
					<DropdownMenuItem
						className="cursor-pointer gap-2 disabled:cursor-default"
						onClick={handleToggleTransferVisibility}
						disabled={isOwner || !canTransferOwnership}
					>
						<IconTransitionTop size={20} />
						Transfer ownership
					</DropdownMenuItem>

					<DropdownMenuItem
						className="cursor-pointer gap-2 disabled:cursor-default"
						onClick={handleToggleRoleVisibility}
						disabled={isOwner || !canChangeRole}
					>
						<IconUserShield size={20} />
						Change role
					</DropdownMenuItem>

					<DropdownMenuSeparator />

					<DropdownMenuItem
						className="cursor-pointer gap-2 disabled:cursor-default"
						onClick={handleToggleRemoveVisibility}
						disabled={isOwner || !canRemoveMember}
					>
						<IconUserMinus size={20} />
						Remove
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<RemoveMemberDialog
				name={member.name}
				memberId={member.memberId}
				open={dialogRemovalVisible}
				onOpenChange={handleToggleRemoveVisibility}
			/>

			<UpdateMemberRoleDialog
				name={member.name}
				role={member.role}
				memberId={member.memberId}
				open={dialogRoleVisible}
				onOpenChange={handleToggleRoleVisibility}
			/>

			<TransferOwnershipDialog
				name={member.name}
				memberId={member.userId}
				open={dialogTransferVisible}
				onOpenChange={handleToggleTransferVisibility}
			/>
		</>
	)
}
