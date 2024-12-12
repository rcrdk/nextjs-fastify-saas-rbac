'use client'

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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { useFormState } from '@/hooks/use-form-state'
import type { TransferOwnershipActions } from '@/http/organizations/transfer-organization-ownership'

import { transferOrganizationOwnershipAction } from './actions'

interface TransferOwnershipDialogProps {
	name: string | null
	memberId: string
	open: boolean
	onOpenChange: () => void
}

export function TransferOwnershipDialog({
	name,
	memberId,
	open,
	onOpenChange,
}: TransferOwnershipDialogProps) {
	const form = useRef<HTMLFormElement>(null)

	const [action, setAction] = useState<TransferOwnershipActions>('UPDATE_ROLE')
	const [transferInput, setTransferInput] = useState('')

	const [{ success, message }, handleTransfer, isPending] = useFormState(
		transferOrganizationOwnershipAction.bind(null, memberId, action),
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
		<form onSubmit={handleTransfer} ref={form}>
			<FormSubmitButton
				className="w-full gap-2"
				disabled={transferInput !== 'TRANSFER'}
				loading={isPending}
			>
				Transfer ownership
			</FormSubmitButton>
		</form>
	)

	return (
		<DialogAction
			title="Transfer organization ownewship:"
			description={`Confirm that you are trying to transfer the ownership of this organization to ${name || 'this member'} and choose an action after this operation:`}
			open={open}
			onOpenChange={onOpenChange}
			actionForm={actionForm}
		>
			<FormGroup>
				<Label>After transfer:</Label>
				<RadioGroup
					className="rounded border py-2"
					defaultValue={action}
					onValueChange={(value: TransferOwnershipActions) => setAction(value)}
				>
					<div className="flex items-center space-x-2 px-4 py-1">
						<RadioGroupItem value="UPDATE_ROLE" id="UPDATE_ROLE" />
						<Label htmlFor="UPDATE_ROLE">Become a regular member</Label>
					</div>

					<div className="flex items-center space-x-2 px-4 py-1">
						<RadioGroupItem value="LEAVE" id="LEAVE" />
						<Label htmlFor="LEAVE">Leave organization</Label>
					</div>
				</RadioGroup>
			</FormGroup>

			<FormGroup>
				<Label>
					Enter <span className="font-semibold text-red-500">TRANSFER</span> to
					confirm:
				</Label>
				<Input
					defaultValue={transferInput}
					onChange={(e) => setTransferInput(e.target.value)}
					onKeyDown={(e) =>
						confirmDialogActionOnPromptEnter(e, 'TRANSFER', form)
					}
					enterKeyHint="send"
				/>
			</FormGroup>
		</DialogAction>
	)
}
