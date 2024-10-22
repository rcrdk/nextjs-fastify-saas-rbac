'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { FormError } from '@/components/form-error'
import { FormSubmitButton } from '@/components/form-submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import {
	createOrganizationAction,
	OrganizationSchema,
	updateOrganizationAction,
} from './actions'

interface OrganizationFormProps {
	isUpdating?: boolean
	initialData?: OrganizationSchema
}

export function OrganizationForm({
	isUpdating = false,
	initialData,
}: OrganizationFormProps) {
	const router = useRouter()

	const formAction = isUpdating
		? updateOrganizationAction
		: createOrganizationAction

	const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
		formAction,
		() => {
			if (!isUpdating) {
				setTimeout(() => router.back(), 300)
			}
		},
	)

	useEffect(() => {
		if (!success && message) {
			toast.error(message, { id: 'organization-form' })
		}
		if (success && message) {
			toast.success(message, { id: 'organization-form' })
		}
	}, [success, message, isPending])

	const buttonText = isUpdating
		? {
				default: 'Save organization',
				loading: 'Saving organization...',
			}
		: {
				default: 'Create new organization',
				loading: 'Creating organization...',
			}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
			<div className="space-y-1">
				<Label htmlFor="name">Organization name</Label>
				<Input
					name="name"
					type="text"
					id="name"
					spellCheck="false"
					defaultValue={initialData?.name}
				/>
				<FormError message={errors?.name} />
			</div>

			<FormSubmitButton loading={isPending} loadingLabel={buttonText.loading}>
				{buttonText.default}
			</FormSubmitButton>
		</form>
	)
}
