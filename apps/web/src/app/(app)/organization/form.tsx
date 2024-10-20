'use client'

import { IconCircleCheck, IconExclamationCircle } from '@tabler/icons-react'

import { FormError } from '@/components/form-error'
import { FormSubmitButton } from '@/components/form-submit-button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
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
	const formAction = isUpdating
		? updateOrganizationAction
		: createOrganizationAction

	const [{ success, message, errors }, handleSubmit, isPending] =
		useFormState(formAction)

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
			{!success && message && (
				<Alert variant="destructive">
					<IconExclamationCircle size={20} />
					<AlertTitle>An error occurred:</AlertTitle>
					<AlertDescription>{message}</AlertDescription>
				</Alert>
			)}

			{success && message && (
				<Alert variant="success">
					<IconCircleCheck size={20} />
					<AlertTitle>Success:</AlertTitle>
					<AlertDescription>{message}</AlertDescription>
				</Alert>
			)}

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
