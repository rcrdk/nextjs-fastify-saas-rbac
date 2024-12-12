'use client'

import type { Role } from '@saas/auth'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { DialogAction } from '@/components/dialog-action'
import { FormSubmitButton } from '@/components/form-submit-button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useFormState } from '@/hooks/use-form-state'

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

	const [{ success, message }, handleUpdate, isPending] = useFormState(
		updateMemberAction.bind(null, memberId, currentRole),
		{
			onSuccess() {
				onOpenChange()
			},
			resetStateMessage: true,
		},
	)

	useEffect(() => {
		if (!success && message) {
			toast.error(message, { id: 'change-member-role' })
		}
		if (success && message) {
			toast.success(message, { id: 'change-member-role' })
		}
	}, [success, message, isPending])

	const actionForm = (
		<form onClick={handleUpdate}>
			<FormSubmitButton className="w-full gap-2" loading={isPending}>
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
