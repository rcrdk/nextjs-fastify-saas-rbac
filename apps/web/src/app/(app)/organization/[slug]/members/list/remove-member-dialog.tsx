'use client'

import { DialogAction } from '@/components/dialog-action'
import { FormSubmitButton } from '@/components/form-submit-button'

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
	const actionForm = (
		<form action={removeMemberAction.bind(null, memberId)}>
			<FormSubmitButton
				variant="destructive"
				className="w-full gap-2"
				loadingLabel="Removing member..."
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
