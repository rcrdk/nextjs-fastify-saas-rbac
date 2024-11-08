'use client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { FormError } from '@/components/form-error'
import { FormGroup } from '@/components/form-group'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import { confirmEmailChangeAction } from './actions'

export function ConfirmEmailChangeButton() {
	const [open, setOpen] = useState(false)

	function handleToggleDialogVisibility() {
		setOpen((prev) => !prev)
	}

	const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
		confirmEmailChangeAction,
		{
			onSuccess() {
				handleToggleDialogVisibility()
			},
			resetStateMessage: true,
		},
	)

	useEffect(() => {
		if (!success && message) {
			toast.error(message, { id: 'email-change' })
		}
		if (success && message) {
			toast.success(message, { id: 'email-change' })
		}
	}, [success, message, isPending])

	return (
		<Dialog open={open} onOpenChange={handleToggleDialogVisibility}>
			<DialogTrigger asChild>
				<Button variant="warning" size="sm">
					Enter the validation code
				</Button>
			</DialogTrigger>

			<DialogContent>
				<DialogHeader>
					<DialogTitle>Confirm e-mail change</DialogTitle>
					<DialogDescription>
						Inform the validation code sent to your new e-mail to confirm.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="space-y-4">
					<FormGroup>
						<Label>Validation code:</Label>
						<Input
							name="code"
							id="code"
							spellCheck="false"
							autoComplete="one-time-code"
							enterKeyHint="send"
						/>
						<FormError message={errors?.code} />
					</FormGroup>

					<DialogFooter>
						<Button
							type="button"
							onClick={handleToggleDialogVisibility}
							variant="outline"
						>
							Cancel
						</Button>

						<Button type="submit">Validate and save e-mail</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
