import { IconChevronDown, IconLogout } from '@tabler/icons-react'

import { auth } from '@/auth'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'

export async function ProfileButton() {
	const { user } = await auth()

	function getInitials(name: string) {
		return name
			.split(' ')
			.map((word) => word[0].toUpperCase())
			.join('')
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="flex select-none items-center outline-none">
				<div className="flex flex-col items-end">
					<span className="text-sm font-medium">
						{user.name ?? 'My Account'}
					</span>
					<span className="text-xs text-muted-foreground">{user.email}</span>
				</div>

				<Avatar className="ml-3 mr-1 size-9">
					{user.avatarUrl && <AvatarImage src={user.avatarUrl} />}
					<AvatarFallback className="text-xs font-medium">
						{getInitials(user.name ?? 'My Account')}
					</AvatarFallback>
				</Avatar>

				<IconChevronDown size={20} className="text-muted-foreground" />
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" sideOffset={12} className="select-none">
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
