'use client'

import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { DialogAction } from '@/components/dialog-action'
import { FormSubmitButton } from '@/components/form-submit-button'
import { useFormState } from '@/hooks/use-form-state'

import { leaveOrganizationAction } from './actions'

interface LeaveOrganizationDialogProps {
	name: string | null
	organizationSlug: string
	open: boolean
	onOpenChange: () => void
}

export function LeaveOrganizationDialog({
	name,
	organizationSlug,
	open,
	onOpenChange,
}: LeaveOrganizationDialogProps) {
	const [{ success, message }, handleRemove, isPending] = useFormState(
		leaveOrganizationAction.bind(null, organizationSlug),
		{
			onSuccess() {
				onOpenChange()
			},
			resetStateMessage: true,
		},
	)

	useEffect(() => {
		if (!success && message) {
			toast.error(message, { id: 'leave-organization' })
		}
		if (success && message) {
			toast.success(message, { id: 'leave-organization' })
		}
	}, [success, message, isPending])

	const actionForm = (
		<form onSubmit={handleRemove}>
			<FormSubmitButton
				variant="destructive"
				className="w-full gap-2"
				loading={isPending}
			>
				Leave organization
			</FormSubmitButton>
		</form>
	)

	return (
		<DialogAction
			title="Confirm your action:"
			description={`Do you really want to leave ${name}? You can only enter again by an invite.`}
			open={open}
			onOpenChange={onOpenChange}
			actionForm={actionForm}
		/>
	)
}
