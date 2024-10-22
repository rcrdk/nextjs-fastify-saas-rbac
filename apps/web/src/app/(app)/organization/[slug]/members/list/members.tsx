import { organizationSchema } from '@saas/auth'
import { IconCrown, IconUser } from '@tabler/icons-react'

import { ability, getCurrentOrganization } from '@/auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getMembers } from '@/http/get-members'
import { getMembership } from '@/http/get-membership'
import { getOrganization } from '@/http/get-organization'
import { getAvatarUrl } from '@/utils/get-avatar-url'
import { getRoleName } from '@/utils/get-role-name'

import { MembersDropdownActions } from './dropdown'

export async function MemberList() {
	const currentOrganization = await getCurrentOrganization()
	const permissions = await ability()

	const [{ membership }, { organization }, { members }] = await Promise.all([
		getMembership({ organizationSlug: currentOrganization! }),
		getOrganization({ organizationSlug: currentOrganization! }),
		getMembers({ organizationSlug: currentOrganization! }),
	])

	const authOrganization = organizationSchema.parse(organization)

	const canTransferOwnership = !!permissions?.can(
		'transfer_ownership',
		authOrganization,
	)

	const canRemoveMember = !!permissions?.can('delete', 'User')

	const canChangeRole = !!permissions?.can('update', 'User')

	return (
		<div className="space-y-2">
			<h2 className="text-lg font-semibold">Active members:</h2>

			<div className="rounded border">
				<Table>
					<TableBody>
						{members.map((member) => (
							<TableRow key={member.userId}>
								<TableCell className="py-1.5 pr-0">
									<Avatar className="block h-8 w-8">
										<AvatarImage
											src={getAvatarUrl(member.avatarUrl, member.email)}
										/>
										<AvatarFallback className="text-xs font-medium">
											<IconUser
												size={20}
												className="text-muted-foreground/50"
											/>
										</AvatarFallback>
									</Avatar>
								</TableCell>

								<TableCell className="py-2.5" style={{ width: '100%' }}>
									<div className="flex flex-col">
										<span className="inline-flex items-center gap-1 font-medium">
											{member.name}
											{member.userId === membership.userId && (
												<span className="text-xs font-light italic">(me)</span>
											)}
											<span className="ml-1 inline-flex items-center gap-1 text-xs font-normal text-muted-foreground">
												{member.userId === organization.ownerId ? (
													<IconCrown size={16} />
												) : (
													<IconUser size={16} />
												)}
												{getRoleName(member.role)}
											</span>
										</span>
										<span className="text-xs text-muted-foreground">
											{member.email}
										</span>
									</div>
								</TableCell>

								<TableCell className="py-2.5">
									<MembersDropdownActions
										permissions={{
											canChangeRole,
											canRemoveMember,
											canTransferOwnership,
										}}
										organization={organization}
										member={member}
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
