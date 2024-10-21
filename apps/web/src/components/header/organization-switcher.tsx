import { IconBuilding, IconCirclePlus, IconSelector } from '@tabler/icons-react'
import Link from 'next/link'

import { getCurrentOrganization } from '@/auth'
import { getOrganizations } from '@/http/get-organizations'

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export async function OrganizationSwitcher() {
	const currentOrganizationCookie = await getCurrentOrganization()
	const { organizations } = await getOrganizations()

	const currentOrganization = organizations.find(
		(item) => item.slug === currentOrganizationCookie,
	)

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="flex max-w-[224px] select-none items-center gap-1 rounded-sm px-3 py-2 text-sm font-medium outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary">
				{currentOrganization ? (
					<>
						<Avatar className="mr-1 size-5">
							{currentOrganization.avatarUrl && (
								<AvatarImage src={currentOrganization.avatarUrl} />
							)}
							<AvatarFallback>
								<IconBuilding
									size={12}
									className="text-foreground opacity-50"
								/>
							</AvatarFallback>
						</Avatar>
						<span className="truncate">{currentOrganization.name}</span>
					</>
				) : (
					<>
						<span className="pr-1 text-muted-foreground">
							Select organization
						</span>
					</>
				)}
				<IconSelector size={16} className="ml-auto shrink-0 text-current" />
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align="center"
				sideOffset={12}
				className="w-[256px] select-none"
			>
				<DropdownMenuGroup>
					<DropdownMenuLabel>Organizations</DropdownMenuLabel>

					{organizations.map((item) => (
						<DropdownMenuItem key={item.id} asChild>
							<Link
								href={`/organization/${item.slug}`}
								className="cursor-pointer"
							>
								<Avatar className="mr-2 size-5">
									{item.avatarUrl && <AvatarImage src={item.avatarUrl} />}
									<AvatarFallback>
										<IconBuilding
											size={12}
											className="text-foreground opacity-50"
										/>
									</AvatarFallback>
								</Avatar>

								<span className="block truncate">{item.name}</span>
							</Link>
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<DropdownMenuItem asChild>
					<Link
						href="/create-organization"
						className="cursor-pointer font-medium"
					>
						<IconCirclePlus size={20} className="mr-2" />
						Create a organization
					</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
