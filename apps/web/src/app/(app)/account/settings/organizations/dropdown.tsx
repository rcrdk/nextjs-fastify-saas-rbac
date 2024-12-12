'use client'

import {
	IconBriefcase,
	IconBuilding,
	IconDoorExit,
	IconDotsVertical,
	IconSettings,
	IconUsers,
} from '@tabler/icons-react'
import Link from 'next/link'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { GetOrganizationsItemResponse } from '@/http/organizations/get-organizations'

import { LeaveOrganizationDialog } from './leave-dialog'

interface OrganizationsDropdownActionsProps {
	organization: GetOrganizationsItemResponse
}

export function OrganizationsDropdownActions({
	organization,
}: OrganizationsDropdownActionsProps) {
	const [dialogLeaveVisible, setDialogLeaveVisible] = useState(false)

	function handleToggleLeaveVisibility() {
		setDialogLeaveVisible((prev) => !prev)
	}

	const isOwner = organization.role === 'ADMIN'

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="icon" className="size-8">
						<IconDotsVertical size={20} />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end">
					{isOwner && (
						<>
							<DropdownMenuItem
								className="cursor-pointer gap-2 disabled:cursor-default"
								asChild
							>
								<Link href={`/organization/${organization.slug}`}>
									<IconBriefcase size={20} />
									Projects
								</Link>
							</DropdownMenuItem>

							<DropdownMenuItem
								className="cursor-pointer gap-2 disabled:cursor-default"
								asChild
							>
								<Link href={`/organization/${organization.slug}/members`}>
									<IconUsers size={20} />
									Members
								</Link>
							</DropdownMenuItem>

							<DropdownMenuItem
								className="cursor-pointer gap-2 disabled:cursor-default"
								asChild
							>
								<Link href={`/organization/${organization.slug}/settings`}>
									<IconSettings size={20} />
									Settings
								</Link>
							</DropdownMenuItem>
						</>
					)}

					{!isOwner && (
						<>
							<DropdownMenuItem
								className="cursor-pointer gap-2 disabled:cursor-default"
								asChild
							>
								<Link href={`/organization/${organization.slug}`}>
									<IconBuilding size={20} />
									Access organization
								</Link>
							</DropdownMenuItem>

							<DropdownMenuSeparator />

							<DropdownMenuItem
								className="cursor-pointer gap-2 disabled:cursor-default"
								onClick={handleToggleLeaveVisibility}
							>
								<IconDoorExit size={20} />
								Leave organization
							</DropdownMenuItem>
						</>
					)}
				</DropdownMenuContent>
			</DropdownMenu>

			<LeaveOrganizationDialog
				name={organization.name}
				organizationSlug={organization.slug}
				open={dialogLeaveVisible}
				onOpenChange={handleToggleLeaveVisibility}
			/>
		</>
	)
}
