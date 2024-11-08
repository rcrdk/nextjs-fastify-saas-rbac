'use client'

import { IconUserMinus } from '@tabler/icons-react'
import { useRef, useState } from 'react'

import {
	confirmDialogActionOnPromptEnter,
	DialogAction,
} from '@/components/dialog-action'
import { FormGroup } from '@/components/form-group'
import { FormSubmitButton } from '@/components/form-submit-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

import { deleteAccountAction } from './actions'

export function DeleteAccountDialog() {
	const form = useRef<HTMLFormElement>(null)

	const [deleteInput, setDeleteInput] = useState('')
	const [open, setOpen] = useState(false)

	function handleToggleDialogVisibility() {
		setOpen((prev) => !prev)
	}

	const RemoveTriggerButton = (
		<Button variant="destructive" className="w-full gap-2">
			<IconUserMinus className="mr-2" stroke={1.5} />
			Delete my account
		</Button>
	)

	const actionForm = (
		<form action={deleteAccountAction} ref={form}>
			<FormSubmitButton
				variant="destructive"
				className="w-full gap-2"
				disabled={deleteInput !== 'DELETE'}
			>
				Delete account
			</FormSubmitButton>
		</form>
	)

	return (
		<DialogAction
			title="Are you sure?"
			description="By deleting your account you will lost the organizations that you owns and the membership from another organizations along with all data included on them. This action cannot be reversed."
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
					className="text-center sm:text-left"
					onChange={(e) => setDeleteInput(e.target.value)}
					onKeyDown={(e) => confirmDialogActionOnPromptEnter(e, 'DELETE', form)}
					enterKeyHint="send"
				/>
			</FormGroup>
		</DialogAction>
	)
}
