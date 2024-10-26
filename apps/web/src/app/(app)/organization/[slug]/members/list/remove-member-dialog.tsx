'use client'

import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { DialogAction } from '@/components/dialog-action'
import { FormSubmitButton } from '@/components/form-submit-button'
import { useFormState } from '@/hooks/use-form-state'

import { removeMemberAction } from './actions'

interface RemoveMemberDialogProps {
	name: string | null
	memberId: string
	open: boolean
	onOpenChange: () => void
}

export function RemoveMemberDialog({
	name,
	memberId,
	open,
	onOpenChange,
}: RemoveMemberDialogProps) {
	const [{ success, message }, handleRemove, isPending] = useFormState(
		removeMemberAction.bind(null, memberId),
		{
			onSuccess() {
				onOpenChange()
			},
			resetStateMessage: true,
		},
	)

	useEffect(() => {
		if (!success && message) {
			toast.error(message, { id: 'remove-member' })
		}
		if (success && message) {
			toast.success(message, { id: 'remove-member' })
		}
	}, [success, message, isPending])

	const actionForm = (
		<form onSubmit={handleRemove}>
			<FormSubmitButton
				variant="destructive"
				className="w-full gap-2"
				loading={isPending}
			>
				Remove member
			</FormSubmitButton>
		</form>
	)

	return (
		<DialogAction
			title="Confirm member removal:"
			description={`Do you really want to remove ${name || 'this member'} from organization? You can invite them again later.`}
			open={open}
			onOpenChange={onOpenChange}
			actionForm={actionForm}
		/>
	)
}
