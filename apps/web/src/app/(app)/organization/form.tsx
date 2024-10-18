'use client'

import { IconCircleCheck, IconExclamationCircle } from '@tabler/icons-react'

import { FormError } from '@/components/form-error'
import { FormSubmitButton } from '@/components/form-submit-button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Checkbox } from '@/components/ui/checkbox'
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
					<AlertTitle>Save organization has failed:</AlertTitle>
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
					defaultValue={initialData?.name}
				/>
				<FormError message={errors?.name} />
			</div>

			<div className="space-y-1">
				<Label htmlFor="domain">Domain</Label>
				<Input
					name="domain"
					type="text"
					id="domain"
					inputMode="url"
					placeholder="example.com"
					defaultValue={initialData?.domain ?? undefined}
				/>
				<FormError message={errors?.domain} />
			</div>

			<div className="space-y-1">
				<div className="flex select-none items-baseline space-x-2">
					<Checkbox
						name="shouldAttachUsersByDomain"
						id="shouldAttachUsersByDomain"
						className="translate-y-1"
						defaultChecked={initialData?.shouldAttachUsersByDomain}
					/>
					<label htmlFor="shouldAttachUsersByDomain" className="space-y-1">
						<span className="text-sm font-medium leading-none">
							Auto-join new member
						</span>
						<p className="text-balance text-sm text-muted-foreground">
							This will automatically invite all memebers with same e-mail
							domain to this organization.
						</p>
					</label>
				</div>
			</div>

			<FormSubmitButton loading={isPending} loadingLabel={buttonText.loading}>
				{buttonText.default}
			</FormSubmitButton>
		</form>
	)
}
