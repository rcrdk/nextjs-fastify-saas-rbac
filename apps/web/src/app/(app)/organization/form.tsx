'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { FormError } from '@/components/form-error'
import { FormGrid } from '@/components/form-grid'
import { FormGroup } from '@/components/form-group'
import { FormSubmitButton } from '@/components/form-submit-button'
import { CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'
import type { FormOrganizationSchema } from '@/schema/form-organization-schema'

import { createOrganizationAction, updateOrganizationAction } from './actions'

interface OrganizationFormProps {
	isUpdating?: boolean
	initialData?: FormOrganizationSchema
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
		{
			onSuccess() {
				if (!isUpdating) {
					setTimeout(() => router.back(), 300)
				}
			},
			resetStateMessage: true,
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

	return (
		<form
			onSubmit={handleSubmit}
			className={isUpdating ? '' : 'flex flex-col space-y-4'}
		>
			{!isUpdating && (
				<>
					<FormGroup>
						<Label htmlFor="name">Organization name</Label>
						<Input
							name="name"
							type="text"
							id="name"
							spellCheck="false"
							defaultValue={initialData?.name}
							autoComplete="organization"
							enterKeyHint="send"
						/>
						<FormError message={errors?.name} />
					</FormGroup>

					<FormSubmitButton loading={isPending}>
						Create new organization
					</FormSubmitButton>
				</>
			)}

			{isUpdating && (
				<>
					<CardContent>
						<FormGrid>
							<FormGroup>
								<Label htmlFor="name">Organization name</Label>
								<Input
									name="name"
									type="text"
									id="name"
									spellCheck="false"
									defaultValue={initialData?.name}
									autoComplete="organization"
									enterKeyHint="send"
								/>
								<FormError message={errors?.name} />
							</FormGroup>
						</FormGrid>
					</CardContent>

					<CardFooter className="justify-end">
						<FormSubmitButton loading={isPending} size="sm">
							Save
						</FormSubmitButton>
					</CardFooter>
				</>
			)}
		</form>
	)
}
