'use client'

import { IconPlugConnectedX } from '@tabler/icons-react'
import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import type { AccountProviders } from '@/@types/account-providers'
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

import { disconnectAction } from './actions'

interface DisconnectButtonProps {
	disabled: boolean
	provider: AccountProviders
}

export function DisconnectButton({
	disabled,
	provider,
}: DisconnectButtonProps) {
	const form = useRef<HTMLFormElement>(null)

	const [deleteInput, setDeleteInput] = useState('')
	const [open, setOpen] = useState(false)

	function handleToggleDialogVisibility() {
		setOpen((prev) => !prev)
	}

	const [{ success, message }, handleRemove, isPending] = useFormState(
		disconnectAction.bind(null, provider),
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
		<Button variant="outline" size="sm" className="gap-2" disabled={disabled}>
			<IconPlugConnectedX size={20} />
			Disconnect
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
				Disconnect
			</FormSubmitButton>
		</form>
	)

	return (
		<DialogAction
			title="Confirm your action:"
			description="Do you really want to disconnect this authentication provider from your account?"
			open={open}
			onOpenChange={handleToggleDialogVisibility}
			triggerButton={RemoveTriggerButton}
			actionForm={actionForm}
		>
			<div className="text-balance rounded border p-3 text-center text-sm text-muted-foreground sm:text-left">
				This action does not remove permissions from your third-party
				authentication account, only from this app.
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
					enterKeyHint="send"
				/>
			</FormGroup>
		</DialogAction>
	)
}
