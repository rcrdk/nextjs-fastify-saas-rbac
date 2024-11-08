'use client'

import { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast'

import {
	confirmDialogActionOnPromptEnter,
	DialogAction,
} from '@/components/dialog-action'
import { FormGroup } from '@/components/form-group'
import { FormSubmitButton } from '@/components/form-submit-button'
import { Button } from '@/components/ui/button'
import { CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import { removeOrganizationDomainAction } from './actions'

export function RemoveDomain() {
	const form = useRef<HTMLFormElement>(null)

	const [deleteInput, setDeleteInput] = useState('')
	const [open, setOpen] = useState(false)

	function handleToggleDialogVisibility() {
		setOpen((prev) => !prev)
	}

	const [{ success, message }, handleRemove, isPending] = useFormState(
		removeOrganizationDomainAction,
		{
			resetStateMessage: true,
		},
	)

	useEffect(() => {
		if (!success && message) {
			toast.error(message, { id: 'remove-domain' })
		}
		if (success && message) {
			toast.success(message, { id: 'remove-domain' })
		}
	}, [success, message, isPending])

	const RemoveTriggerButton = (
		<CardContent className="order-4 self-center sm:order-2 sm:p-5 sm:pb-0">
			<Button
				variant="destructive"
				className="w-full min-w-24 gap-2 sm:w-auto"
				size="sm"
			>
				Remove
			</Button>
		</CardContent>
	)

	const actionForm = (
		<form onSubmit={handleRemove} ref={form}>
			<FormSubmitButton
				variant="destructive"
				className="w-full gap-2"
				disabled={deleteInput !== 'DELETE'}
				loading={isPending}
			>
				Remove domain
			</FormSubmitButton>
		</form>
	)

	return (
		<DialogAction
			title="Confirm domain removal:"
			description="Do you really want to remove the domain from your organization? You can configure it again later."
			open={open}
			onOpenChange={handleToggleDialogVisibility}
			triggerButton={RemoveTriggerButton}
			actionForm={actionForm}
		>
			<FormGroup className="text-center sm:text-left">
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
