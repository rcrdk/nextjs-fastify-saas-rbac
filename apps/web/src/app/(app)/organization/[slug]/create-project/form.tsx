'use client'

import {
	IconCircleCheck,
	IconExclamationCircle,
	IconSettings,
} from '@tabler/icons-react'
import { useParams } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
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
					<AlertTitle>Save project has failed:</AlertTitle>
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
				{errors?.name && (
					<p className="text-xs text-red-500 dark:text-red-400">
						{errors.name.at(0)}
					</p>
				)}
			</div>

			<div className="space-y-1">
				<Label htmlFor="domain">Project description</Label>
				<Textarea name="description" id="description" rows={3} />
				{errors?.description && (
					<p className="text-xs text-red-500 dark:text-red-400">
						{errors.description.at(0)}
					</p>
				)}
			</div>

			<Button type="submit" disabled={isPending} className="gap-2">
				{isPending ? (
					<>
						<IconSettings size={20} className="animate-spin duration-2000" />
						Saving project...
					</>
				) : (
					'Save project'
				)}
			</Button>
		</form>
	)
}
