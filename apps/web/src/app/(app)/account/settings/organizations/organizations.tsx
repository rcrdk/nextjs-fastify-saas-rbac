import { IconBriefcase, IconCrown, IconUser } from '@tabler/icons-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getOrganizations } from '@/http/organizations/get-organizations'
import { getAvatarUrl } from '@/utils/get-avatar-url'
import { getRoleName } from '@/utils/get-role-name'

import { OrganizationsDropdownActions } from './dropdown'

export async function Organizations() {
	const { organizations } = await getOrganizations()

	return (
		<Card>
			<CardHeader>
				<CardTitle>Organizations</CardTitle>
				<CardDescription>
					Manage your organization and organizations that you are in.
				</CardDescription>
			</CardHeader>

			<CardContent className="border-t p-0">
				{!organizations.length && (
					<div className="px-5 py-4 text-sm text-muted-foreground">
						You are not a member or owner of an organization.
					</div>
				)}

				<Table>
					<TableBody>
						{organizations.map((item) => (
							<TableRow key={item.id}>
								<TableCell className="py-1.5 pr-0 ps-5">
									<Avatar className="block h-8 w-8">
										<AvatarImage src={getAvatarUrl(item.avatarUrl)} />
										<AvatarFallback className="text-xs font-medium">
											<IconBriefcase
												size={20}
												className="text-muted-foreground opacity-50"
											/>
										</AvatarFallback>
									</Avatar>
								</TableCell>

								<TableCell className="py-2.5" style={{ width: '100%' }}>
									<div className="flex flex-col">
										<span className="inline-flex items-center gap-1 font-medium">
											{item.name}

											<span className="ml-1 inline-flex items-center gap-1 text-xs font-normal text-muted-foreground"></span>
										</span>
										<span className="flex items-center gap-1 text-xs text-muted-foreground">
											{item.role === 'ADMIN' ? (
												<IconCrown size={16} />
											) : (
												<IconUser size={16} />
											)}
											{getRoleName(item.role)}
										</span>
									</div>
								</TableCell>

								<TableCell className="py-2.5 pe-5">
									<OrganizationsDropdownActions organization={item} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	)
}
