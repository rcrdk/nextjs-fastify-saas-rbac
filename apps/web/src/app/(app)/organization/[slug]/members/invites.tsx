import { ability, getCurrentOrganization } from '@/auth'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { getInvites } from '@/http/get-invites'
import { getRoleName } from '@/utils/get-role-name'

import { CreateInviteForm } from './create-invite-form'
import { RevokeInviteButton } from './revoke-invite-button'

export async function Invites() {
	const currentOrganizarion = getCurrentOrganization()
	const permissions = await ability()

	const { invites } = await getInvites(currentOrganizarion!)

	return (
		<div className="space-y-4">
			<h2 className="text-lg font-semibold">Invites to organization:</h2>

			{permissions?.can('create', 'Invite') && (
				<Card>
					<CardHeader className="sr-only">
						<CardTitle className="text-md">Invite a new member</CardTitle>
					</CardHeader>
					<CardContent className="p-5">
						<CreateInviteForm />
					</CardContent>
				</Card>
			)}

			<div className="rounded border">
				<Table>
					<TableBody>
						{invites.map((invite) => (
							<TableRow key={invite.id}>
								<TableCell className="py-2.5" style={{ width: '100%' }}>
									<div className="flex flex-col">
										<span className="font-medium">{invite.email}</span>
										<span className="text-xs text-muted-foreground">
											{getRoleName(invite.role)}
										</span>
									</div>
								</TableCell>

								<TableCell className="py-2.5">
									<div className="flex justify-end">
										{permissions?.can('delete', 'Invite') && (
											<RevokeInviteButton inviteId={invite.id} />
										)}
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>

				{invites.length === 0 && (
					<div className="p-5 text-sm text-muted-foreground">
						There are no open invites by now.
					</div>
				)}
			</div>
		</div>
	)
}
