'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { FormError } from '@/components/form-error'
import { FormSubmitButton } from '@/components/form-submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useFormState } from '@/hooks/use-form-state'
import { queryClient } from '@/lib/react-query'

import { createProjectAction, ProjectSchema } from './actions'

interface ProjectFormProps {
	isUpdating?: boolean
	initialData?: ProjectSchema
}

export function ProjectForm({ isUpdating, initialData }: ProjectFormProps) {
	const { slug: organization } = useParams<{ slug: string }>()
	const router = useRouter()

	const formAction = isUpdating
		? createProjectAction // updateOrganizationAction
		: createProjectAction

	const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
		formAction,
		() => {
			queryClient.invalidateQueries({
				queryKey: [organization, 'projects'],
			})

			if (!isUpdating) {
				setTimeout(() => router.back(), 300)
			}
		},
	)

	useEffect(() => {
		if (!success && message) {
			toast.error(message, { id: 'project-form' })
		}
		if (success && message) {
			toast.success(message, { id: 'project-form' })
		}
	}, [success, message, isPending])

	const buttonText = isUpdating
		? {
				default: 'Save project',
				loading: 'Saving project...',
			}
		: {
				default: 'Create new project',
				loading: 'Creating project...',
			}

	return (
		<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
			<div className="space-y-1">
				<Label htmlFor="name">Project name</Label>
				<Input
					name="name"
					type="text"
					id="name"
					defaultValue={initialData?.name}
				/>
				<FormError message={errors?.name} />
			</div>

			<div className="space-y-1">
				<Label htmlFor="domain">Project description</Label>
				<Textarea
					name="description"
					id="description"
					rows={3}
					defaultValue={initialData?.description}
				/>
				<FormError message={errors?.description} />
			</div>

			<FormSubmitButton loading={isPending} loadingLabel={buttonText.loading}>
				{buttonText.default}
			</FormSubmitButton>
		</form>
	)
}
