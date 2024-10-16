import { organizationSchema } from '@saas/auth'
import {
	IconCrown,
	IconTransitionTop,
	IconUserMinus,
} from '@tabler/icons-react'
import Image from 'next/image'

import { ability, getCurrentOrganization } from '@/auth'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getMembers } from '@/http/get-members'
import { getMembership } from '@/http/get-membership'
import { getOrganization } from '@/http/get-organization'

import { removeMemberAction } from './actions'
import { UpdateMemberRoleSelect } from './update-member-role-select'

export async function MemberList() {
	const currentOrganizarion = getCurrentOrganization()
	const permissions = await ability()

	const [{ membership }, { organization }, { members }] = await Promise.all([
		getMembership(currentOrganizarion!),
		getOrganization(currentOrganizarion!),
		getMembers(currentOrganizarion!),
	])

	const authOrganization = organizationSchema.parse(organization)

	return (
		<div className="space-y-2">
			<h2 className="text-lg font-semibold">Active members</h2>

			<div className="rounded border">
				<Table>
					<TableBody>
						{members.map((member) => (
							<TableRow key={member.userId}>
								<TableCell className="py-1.5 pr-0">
									<Avatar className="block h-8 w-8">
										{member.avatarUrl && (
											<Image
												src={member.avatarUrl}
												width={48}
												height={48}
												alt={member.name ?? 'Profile avatar'}
											/>
										)}
										<AvatarFallback />
									</Avatar>
								</TableCell>

								<TableCell className="py-2.5" style={{ width: '100%' }}>
									<div className="flex flex-col">
										<span className="inline-flex items-center gap-1 font-medium">
											{member.name}
											{member.userId === membership.userId && (
												<span className="font-normal">(me)</span>
											)}
											{member.userId === organization.ownerId && (
												<span className="ml-1 inline-flex items-center gap-1 text-xs font-normal text-muted-foreground">
													<IconCrown size={16} />
													Owner
												</span>
											)}
										</span>
										<span className="text-xs text-muted-foreground">
											{member.email}
										</span>
									</div>
								</TableCell>

								<TableCell className="py-2.5">
									<div className="flex items-center justify-end gap-2">
										<UpdateMemberRoleSelect
											memberId={member.memberId}
											value={member.role}
											disabled={
												member.userId === organization.ownerId ||
												member.userId === membership.userId ||
												permissions?.cannot('update', 'User')
											}
										/>

										{permissions?.can(
											'transfer_ownership',
											authOrganization,
										) && (
											<Button
												size="sm"
												variant="ghost"
												className="gap-2"
												disabled={member.userId === organization.ownerId}
											>
												<IconTransitionTop size={20} />
												Transfer ownership
											</Button>
										)}

										{permissions?.can('delete', 'User') && (
											<form
												action={removeMemberAction.bind(null, member.memberId)}
											>
												<Button
													type="submit"
													size="sm"
													variant="destructive"
													className="gap-2"
													disabled={
														member.userId === organization.ownerId ||
														member.userId === membership.userId
													}
												>
													<IconUserMinus size={20} />
													Remove
												</Button>
											</form>
										)}
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
