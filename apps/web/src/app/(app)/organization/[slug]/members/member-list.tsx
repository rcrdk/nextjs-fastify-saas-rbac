import { organizationSchema } from '@saas/auth'
import {
	IconCrown,
	IconDotsVertical,
	IconTransitionTop,
	IconUser,
	IconUserMinus,
} from '@tabler/icons-react'
import Image from 'next/image'

import { ability, getCurrentOrganization } from '@/auth'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getMembers } from '@/http/get-members'
import { getMembership } from '@/http/get-membership'
import { getOrganization } from '@/http/get-organization'
import { getRoleName } from '@/utils/get-role-name'

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

	const canTransferOwnership = permissions?.can(
		'transfer_ownership',
		authOrganization,
	)

	const canRemoveMember = permissions?.can('delete', 'User')

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
												<span className="text-xs font-light italic">(me)</span>
											)}
											<span className="ml-1 inline-flex items-center gap-1 text-xs font-normal text-muted-foreground">
												{member.userId === organization.ownerId ? (
													<>
														<IconCrown size={16} />
														{getRoleName(member.role)}
													</>
												) : (
													<>
														<IconUser size={16} />
														{getRoleName(member.role)}
													</>
												)}
											</span>
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

										<DropdownMenu>
											<DropdownMenuTrigger asChild>
												<Button
													variant="outline"
													size="icon"
													className="size-8"
													disabled={!canTransferOwnership && !canRemoveMember}
												>
													<IconDotsVertical size={20} />
												</Button>
											</DropdownMenuTrigger>

											<DropdownMenuContent align="end">
												{canTransferOwnership && (
													<DropdownMenuItem
														disabled={member.userId === organization.ownerId}
														asChild
													>
														<button className="cursor-pointer gap-2 disabled:cursor-default">
															<IconTransitionTop size={20} />
															Transfer ownership
														</button>
													</DropdownMenuItem>
												)}

												{canRemoveMember && (
													<form
														action={removeMemberAction.bind(
															null,
															member.memberId,
														)}
														className="w-full"
													>
														<DropdownMenuItem
															disabled={
																member.userId === organization.ownerId ||
																member.userId === membership.userId
															}
															asChild
														>
															<button
																type="submit"
																className="w-full cursor-pointer gap-2 disabled:cursor-default"
															>
																<IconUserMinus size={20} />
																Remove
															</button>
														</DropdownMenuItem>
													</form>
												)}
											</DropdownMenuContent>
										</DropdownMenu>
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
