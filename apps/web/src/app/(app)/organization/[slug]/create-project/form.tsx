'use client'

import { IconCircleCheck, IconExclamationCircle } from '@tabler/icons-react'
import { useParams } from 'next/navigation'

import { FormError } from '@/components/form-error'
import { FormSubmitButton } from '@/components/form-submit-button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useFormState } from '@/hooks/use-form-state'
import { queryClient } from '@/lib/react-query'

import { createProjectAction } from './actions'

export function ProjectForm() {
	const { slug: organization } = useParams<{ slug: string }>()

	const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
		createProjectAction,
		() => {
			queryClient.invalidateQueries({
				queryKey: [organization, 'projects'],
			})
		},
	)

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
				<Label htmlFor="name">Project name</Label>
				<Input name="name" type="text" id="name" />
				<FormError message={errors?.name} />
			</div>

			<div className="space-y-1">
				<Label htmlFor="domain">Project description</Label>
				<Textarea name="description" id="description" rows={3} />
				<FormError message={errors?.description} />
			</div>

			<FormSubmitButton loading={isPending} loadingLabel="Creating project...">
				Create new project
			</FormSubmitButton>
		</form>
	)
}
