'use client'

import { useState } from 'react'

import { DialogAction } from '@/components/dialog-action'
import { FormSubmitButton } from '@/components/form-submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { TransferOwnershipActions } from '@/http/transfer-organization-ownership'

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
	const [action, setAction] = useState<TransferOwnershipActions>('UPDATE_ROLE')
	const [transferInput, setTransferInput] = useState('')

	const actionForm = (
		<form
			action={transferOrganizationOwnershipAction.bind(null, memberId, action)}
		>
			<FormSubmitButton
				className="w-full gap-2"
				loadingLabel="Tranfering..."
				disabled={transferInput !== 'TRANSFER'}
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
			<div className="space-y-1">
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
			</div>

			<div className="space-y-1">
				<Label>
					Enter <span className="font-semibold text-red-500">TRANSFER</span> to
					confirm:
				</Label>
				<Input
					defaultValue={transferInput}
					onChange={(e) => setTransferInput(e.target.value)}
				/>
			</div>
		</DialogAction>
	)
}
