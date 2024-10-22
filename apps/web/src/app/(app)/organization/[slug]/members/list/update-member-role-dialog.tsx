'use client'

import { Role } from '@saas/auth'
import { useState } from 'react'

import { DialogAction } from '@/components/dialog-action'
import { FormSubmitButton } from '@/components/form-submit-button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

import { updateMemberAction } from './actions'

interface UpdateMemberRoleDialogProps {
	name: string | null
	role: Role
	memberId: string
	open: boolean
	onOpenChange: () => void
}

export function UpdateMemberRoleDialog({
	name,
	role,
	memberId,
	open,
	onOpenChange,
}: UpdateMemberRoleDialogProps) {
	const [currentRole, setCurrentRole] = useState<Role>(role)

	const actionForm = (
		<form action={updateMemberAction.bind(null, memberId, currentRole)}>
			<FormSubmitButton
				className="w-full gap-2"
				loadingLabel="Updating role..."
			>
				Set new role
			</FormSubmitButton>
		</form>
	)

	return (
		<DialogAction
			title="Update member role:"
			description={`Choose a new role for ${name || 'this member'} in this organization:`}
			open={open}
			onOpenChange={onOpenChange}
			actionForm={actionForm}
		>
			<RadioGroup
				className="rounded border py-2"
				defaultValue={currentRole}
				onValueChange={(value: Role) => setCurrentRole(value)}
			>
				<div className="flex items-center space-x-2 px-4 py-1">
					<RadioGroupItem value="MEMBER" id="MEMBER" />
					<Label htmlFor="MEMBER">Member</Label>
				</div>

				<div className="flex items-center space-x-2 px-4 py-1">
					<RadioGroupItem value="BILLING" id="BILLING" />
					<Label htmlFor="BILLING">Billing</Label>
				</div>
			</RadioGroup>
		</DialogAction>
	)
}
