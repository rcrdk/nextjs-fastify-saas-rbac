'use client'

import { IconCircleX } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { DialogAction } from '@/components/dialog-action'
import { FormSubmitButton } from '@/components/form-submit-button'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import { removeOrganizationDomainAction } from './actions'

interface RemoveDomainProps {
	domain: string | null
}

export function RemoveDomain({ domain }: RemoveDomainProps) {
	const [deleteInput, setDeleteInput] = useState('')
	const [open, setOpen] = useState(false)

	function handleToggleDialogVisibility() {
		setOpen((prev) => !prev)
	}

	const [{ success, message }, handleRemove, isPending] = useFormState(
		removeOrganizationDomainAction,
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
		<Button variant="destructive" className="gap-2">
			<IconCircleX size={20} />
			Remove Organization Domain
		</Button>
	)

	const actionForm = (
		<form onSubmit={handleRemove}>
			<FormSubmitButton
				variant="destructive"
				className="w-full gap-2"
				disabled={deleteInput !== 'DELETE'}
				loading={isPending}
				loadingLabel="Removing domain..."
			>
				Remove domain
			</FormSubmitButton>
		</form>
	)

	return (
		<Card className="flex flex-col justify-between gap-4 p-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-6">
			<div className="space-y-1">
				<Label className="text-foreground">Domain {domain}:</Label>
				<p className="text-balance">
					A domain is configured for your organization. In order to change
					domain, you must remove the current one.
				</p>
			</div>

			<DialogAction
				title="Confirm domain removal:"
				description="Do you really want to remove the domain from your organization? You can configure it again later."
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
		</Card>
	)
}
