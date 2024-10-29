'use client'

import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { Button } from '@/components/ui/button'
import { useFormState } from '@/hooks/use-form-state'

import { cancelEmailChangeAction } from './actions'

export function CancelEmailChangeButton() {
	const [{ success, message }, handleSubmit, isPending] = useFormState(
		cancelEmailChangeAction,
		{
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
		<form onSubmit={handleSubmit}>
			<Button variant="ghostWarning" size="sm">
				Keep the old e-mail
			</Button>
		</form>
	)
}
