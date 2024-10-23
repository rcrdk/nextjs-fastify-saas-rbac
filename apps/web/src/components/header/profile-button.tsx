import { IconChevronDown, IconLogout, IconSettings } from '@tabler/icons-react'
import Link from 'next/link'

import { auth } from '@/auth'
import { getAvatarUrl } from '@/utils/get-avatar-url'
import { getInitials } from '@/utils/get-initials'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export async function ProfileButton() {
	const { user } = await auth()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="flex select-none items-center outline-none">
				<Avatar className="mr-1 size-9">
					<AvatarImage src={getAvatarUrl(user.avatarUrl, user.email)} />
					<AvatarFallback className="text-xs font-medium">
						{getInitials(user.name ?? 'My Account')}
					</AvatarFallback>
				</Avatar>

				<IconChevronDown
					size={20}
					className="hidden text-muted-foreground sm:block"
				/>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" sideOffset={12} className="select-none">
				<div className="flex flex-col px-3 py-2 text-center">
					<span className="text-sm font-medium">
						{user.name ?? 'My Account'}
					</span>
					<span className="text-xs text-muted-foreground">{user.email}</span>
				</div>

				<DropdownMenuSeparator />

				<DropdownMenuItem asChild>
					<Link href="account/settings">
						<IconSettings size={20} className="mr-2" />
						Accout settings
					</Link>
				</DropdownMenuItem>

				<DropdownMenuSeparator />

				<DropdownMenuItem asChild>
					<a href="/api/auth/sign-out" className="cursor-pointer">
						<IconLogout size={20} className="mr-2" />
						Sign out
					</a>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
