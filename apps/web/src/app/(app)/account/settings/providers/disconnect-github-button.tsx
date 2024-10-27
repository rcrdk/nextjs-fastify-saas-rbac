'use client'

import { IconBrandGithub } from '@tabler/icons-react'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import {
	confirmDialogActionOnPromptEnter,
	DialogAction,
} from '@/components/dialog-action'
import { FormGroup } from '@/components/form-group'
import { FormSubmitButton } from '@/components/form-submit-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import { disconnectGitHubAction } from './actions'

interface DisconnectGitHubButtonProps {
	disabled: boolean
}

export function DisconnectGitHubButton({
	disabled,
}: DisconnectGitHubButtonProps) {
	const form = useRef<HTMLFormElement>(null)

	const [deleteInput, setDeleteInput] = useState('')
	const [open, setOpen] = useState(false)

	function handleToggleDialogVisibility() {
		setOpen((prev) => !prev)
	}

	const [{ success, message }, handleRemove, isPending] = useFormState(
		disconnectGitHubAction,
		{
			onSuccess() {
				handleToggleDialogVisibility()
			},
			resetStateMessage: true,
		},
	)

	useEffect(() => {
		if (!success && message) {
			toast.error(message, { id: 'remove-provider' })
		}
		if (success && message) {
			toast.success(message, { id: 'remove-provider' })
		}
	}, [success, message, isPending])

	const RemoveTriggerButton = (
		<Button variant="secondary" disabled={disabled} className="w-full gap-2">
			<IconBrandGithub size={20} />
			Disconnect from GitHub
		</Button>
	)

	const actionForm = (
		<form onSubmit={handleRemove} ref={form}>
			<FormSubmitButton
				variant="destructive"
				className="w-full gap-2"
				disabled={deleteInput !== 'REMOVE'}
				loading={isPending}
			>
				Disconnect GitHub
			</FormSubmitButton>
		</form>
	)

	return (
		<DialogAction
			title="Confirm action:"
			description="Do you really want to remove the GitHub connection from your account? You connect again if your GitHub account e-mail is the same of your account here."
			open={open}
			onOpenChange={handleToggleDialogVisibility}
			triggerButton={RemoveTriggerButton}
			actionForm={actionForm}
		>
			<div className="text-balance rounded border p-3 text-center text-sm text-muted-foreground sm:text-left">
				This action does not remove permissions from your GitHub account, only
				from this app.
			</div>

			<FormGroup className="text-center sm:text-left">
				<Label>
					Enter <span className="font-semibold text-red-500">REMOVE</span> to
					confirm:
				</Label>
				<Input
					defaultValue={deleteInput}
					className="text-center sm:text-left"
					onChange={(e) => setDeleteInput(e.target.value)}
					onKeyDown={(e) => confirmDialogActionOnPromptEnter(e, 'REMOVE', form)}
				/>
			</FormGroup>
		</DialogAction>
	)
}
