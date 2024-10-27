'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { FormError } from '@/components/form-error'
import { FormGroup } from '@/components/form-group'
import { FormSubmitButton } from '@/components/form-submit-button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useFormState } from '@/hooks/use-form-state'
import { queryClient } from '@/lib/react-query'
import { FormProjectSchema } from '@/schema/form-project-schema'

import { createProjectAction } from './actions'

interface ProjectFormProps {
	isUpdating?: boolean
	initialData?: FormProjectSchema
}

export function ProjectForm({ isUpdating, initialData }: ProjectFormProps) {
	const { slug: organization } = useParams<{ slug: string }>()
	const router = useRouter()

	const formAction = isUpdating
		? createProjectAction // updateProjectAction
		: createProjectAction

	const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
		formAction,
		{
			onSuccess() {
				queryClient.invalidateQueries({
					queryKey: [organization, 'projects'],
				})

				if (!isUpdating) {
					setTimeout(() => router.back(), 300)
				}
			},
			resetStateMessage: true,
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

	return (
		<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
			<FormGroup>
				<Label htmlFor="name">Project name</Label>
				<Input
					name="name"
					type="text"
					id="name"
					defaultValue={initialData?.name}
				/>
				<FormError message={errors?.name} />
			</FormGroup>

			<FormGroup>
				<Label htmlFor="domain">Project description</Label>
				<Textarea
					name="description"
					id="description"
					rows={3}
					defaultValue={initialData?.description}
				/>
				<FormError message={errors?.description} />
			</FormGroup>

			<FormSubmitButton loading={isPending}>
				{isUpdating ? 'Save project' : 'Create new project'}
			</FormSubmitButton>
		</form>
	)
}
