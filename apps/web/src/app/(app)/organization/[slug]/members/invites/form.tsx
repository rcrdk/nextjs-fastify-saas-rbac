'use client'

import { IconSend } from '@tabler/icons-react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { FormError } from '@/components/form-error'
import { FormSubmitButton } from '@/components/form-submit-button'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useFormState } from '@/hooks/use-form-state'

import { createInviteAction } from './actions'

export function CreateInviteForm() {
	const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
		createInviteAction,
		{
			resetFormOnSuccess: true,
			resetStateMessage: true,
		},
	)

	useEffect(() => {
		if (!success && message) {
			toast.error(message, { id: 'invite' })
		}
		if (success && message) {
			toast.success(message, { id: 'invite' })
		}
	}, [success, message, isPending])

	return (
		<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
			<div className="flex flex-col gap-4 md:flex-row md:items-start">
				<div className="flex-grow space-y-1">
					<Input
						name="email"
						type="email"
						id="email"
						autoComplete="email"
						placeholder="Invite member by e-mail"
						enterKeyHint="send"
					/>
					<FormError message={errors?.email} />
				</div>

				<div className="flex-grow space-y-1">
					<Select name="role" defaultValue="MEMBER">
						<SelectTrigger>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="MEMBER">Member</SelectItem>
							<SelectItem value="BILLING">Billing</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<FormSubmitButton
					loading={isPending}
					className="min-w-48 flex-shrink-0"
				>
					<IconSend size={20} />
					Send invite
				</FormSubmitButton>
			</div>
		</form>
	)
}
