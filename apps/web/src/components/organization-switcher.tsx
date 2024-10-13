import { IconBuilding, IconCirclePlus, IconSelector } from '@tabler/icons-react'
import { cookies } from 'next/headers'
import Link from 'next/link'

import { getOrganizations } from '@/http/get-organizations'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'

export async function OrganizationSwitcher() {
	const currentOrganizationCookie = cookies().get('@SAAS:organization')?.value
	const { organizations } = await getOrganizations()

	const currentOrganization = organizations.find(
		(item) => item.slug === currentOrganizationCookie,
	)

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="flex w-[168px] select-none items-center gap-1 rounded-sm p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
				{currentOrganization ? (
					<>
						<span className="truncate">{currentOrganization.name}</span>
						<IconSelector size={16} className="ml-auto shrink-0 text-current" />
					</>
				) : (
					<>
						<span className="text-muted-foreground">Select organization</span>
						<IconSelector
							size={16}
							className="ml-auto shrink-0 text-muted-foreground"
						/>
					</>
				)}
			</DropdownMenuTrigger>

			<DropdownMenuContent
				align="end"
				alignOffset={-16}
				sideOffset={12}
				className="w-[200px] select-none"
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
										<IconBuilding size={12} className="text-muted" />
									</AvatarFallback>
								</Avatar>

								<span className="block truncate">{item.name}</span>
							</Link>
						</DropdownMenuItem>
					))}
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<DropdownMenuItem asChild>
					<Link href="/create-organization" className="cursor-pointer">
						<IconCirclePlus size={20} className="mr-2" />
						Create new
					</Link>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
