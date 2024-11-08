'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import {
	confirmDialogActionOnPromptEnter,
	DialogAction,
} from '@/components/dialog-action'
import { FormGroup } from '@/components/form-group'
import { FormSubmitButton } from '@/components/form-submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import { deleteProjectAction } from './actions'

interface DeleteProjectDialogProps {
	projectId: string
	organizationSlug: string
	open: boolean
	onOpenChange: () => void
}

export function DeleteProjectDialog({
	projectId,
	organizationSlug,
	open,
	onOpenChange,
}: DeleteProjectDialogProps) {
	const queryClient = useQueryClient()

	const form = useRef<HTMLFormElement>(null)

	const [deleteInput, setDeleteInput] = useState('')

	const [{ success, message }, handleRemove, isPending] = useFormState(
		deleteProjectAction.bind(null, projectId),
		{
			onSuccess() {
				onOpenChange()
				queryClient.resetQueries({ queryKey: [organizationSlug, 'projects'] })
			},
			// resetStateMessage: true,
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
		<form onSubmit={handleRemove} ref={form}>
			<FormSubmitButton
				variant="destructive"
				className="w-full gap-2"
				loading={isPending}
				disabled={deleteInput !== 'DELETE'}
			>
				Remove project
			</FormSubmitButton>
		</form>
	)

	return (
		<DialogAction
			title="Confirm project removal:"
			description={`Do you really want to remove this project? You cannot undo this action.`}
			open={open}
			onOpenChange={onOpenChange}
			actionForm={actionForm}
		>
			<FormGroup>
				<Label>
					Enter <span className="font-semibold text-red-500">DELETE</span> to
					confirm:
				</Label>
				<Input
					defaultValue={deleteInput}
					onChange={(e) => setDeleteInput(e.target.value)}
					onKeyDown={(e) => confirmDialogActionOnPromptEnter(e, 'DELETE', form)}
					enterKeyHint="send"
				/>
			</FormGroup>
		</DialogAction>
	)
}
