import { IconChevronDown, IconLogout } from '@tabler/icons-react'

import { auth } from '@/auth'
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
					{user.avatarUrl && <AvatarImage src={user.avatarUrl} />}
					<AvatarFallback className="text-xs font-medium">
						{getInitials(user.name ?? 'My Account')}
					</AvatarFallback>
				</Avatar>

				<IconChevronDown size={20} className="text-muted-foreground" />
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
					<a href="/api/auth/sign-out" className="cursor-pointer">
						<IconLogout size={20} className="mr-2" />
						Sign out
					</a>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
