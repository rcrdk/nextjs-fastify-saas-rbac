import { IconBuilding, IconCirclePlus, IconSelector } from '@tabler/icons-react'
import Link from 'next/link'

import { getCurrentOrganization } from '@/auth'
import { getOrganizations } from '@/http/organizations/get-organizations'
import { getAvatarUrl } from '@/utils/get-avatar-url'

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
			<DropdownMenuTrigger className="flex w-full select-none items-center gap-1 rounded-sm bg-foreground/5 px-3 py-2 text-sm font-medium outline-none transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-primary sm:w-auto sm:max-w-[288px] sm:bg-transparent md:max-w-[204px] lg:max-w-[264px]">
				{currentOrganization ? (
					<>
						<Avatar className="mr-1 size-5">
							{currentOrganization.avatarUrl && (
								<AvatarImage
									src={getAvatarUrl(currentOrganization.avatarUrl)}
								/>
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
				sideOffset={8}
				collisionPadding={20}
				className="w-[calc(100vw-40px)] select-none sm:w-auto sm:max-w-[328px] md:max-w-[264px] lg:max-w-[304px]"
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
									{item.avatarUrl && (
										<AvatarImage src={getAvatarUrl(item.avatarUrl)} />
									)}
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
