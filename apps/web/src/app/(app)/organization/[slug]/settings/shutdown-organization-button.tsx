'use client'

import { IconCircleX } from '@tabler/icons-react'
import { useState } from 'react'

import { DialogAction } from '@/components/dialog-action'
import { FormSubmitButton } from '@/components/form-submit-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { shutdownOrganizationAction } from './actions'

export function ShutdownOrganizationButton() {
	const [deleteInput, setDeleteInput] = useState('')
	const [open, setOpen] = useState(false)

	function handleToggleDialogVisibility() {
		setOpen((prev) => !prev)
	}

	const RemoveTriggerButton = (
		<Button variant="destructive" className="gap-2">
			<IconCircleX className="mr-2" stroke={1.5} />
			Shutdown organization
		</Button>
	)

	const actionForm = (
		<form action={shutdownOrganizationAction}>
			<FormSubmitButton
				variant="destructive"
				className="w-full gap-2"
				disabled={deleteInput !== 'DELETE'}
				loadingLabel="Shutting down..."
			>
				Shutdown organization
			</FormSubmitButton>
		</form>
	)

	return (
		<DialogAction
			title="Confirm shutdown organization:"
			description="Do you really want to shut down your organization? All data will be lost permanently and you cannot undo this action."
			open={open}
			onOpenChange={handleToggleDialogVisibility}
			triggerButton={RemoveTriggerButton}
			actionForm={actionForm}
		>
			<div className="space-y-1">
				{/* eslint-disable-next-line prettier/prettier */}
				<Label>Enter <span className="font-semibold text-red-500">DELETE</span> to confirm:</Label>
				<Input
					defaultValue={deleteInput}
					onChange={(e) => setDeleteInput(e.target.value)}
				/>
			</div>
		</DialogAction>
	)
}
