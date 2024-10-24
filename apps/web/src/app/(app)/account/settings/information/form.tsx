'use client'

import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { FormError } from '@/components/form-error'
import { FormSubmitButton } from '@/components/form-submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import { saveAccountInformationsAction } from '../actions'

interface AccountInformationFormProps {
	initialData: {
		name: string | null
		email: string
	}
}

export function AccountInformationForm({
	initialData,
}: AccountInformationFormProps) {
	const [{ success, message, errors }, handleUpdate, isPending] = useFormState(
		saveAccountInformationsAction,
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
		<form onSubmit={handleUpdate} className="flex flex-col space-y-4">
			<div className="grid grid-cols-1 gap-x-6 gap-y-4 lg:grid-cols-2">
				<div className="space-y-1">
					<Label>Name:</Label>
					<Input
						name="name"
						id="name"
						type="text"
						defaultValue={initialData.name ?? undefined}
					/>
					<FormError message={errors?.name} />
				</div>

				<div className="space-y-1">
					<Label>E-mail:</Label>
					<Input
						name="email"
						id="email"
						type="email"
						readOnly
						defaultValue={initialData.email}
					/>
					<FormError message={errors?.email} />
				</div>
			</div>

			<FormSubmitButton
				className="sm:min-w-80 sm:self-center"
				loading={false}
				loadingLabel="Updating profile..."
				variant="secondary"
			>
				Update profile
			</FormSubmitButton>
		</form>
	)
}
