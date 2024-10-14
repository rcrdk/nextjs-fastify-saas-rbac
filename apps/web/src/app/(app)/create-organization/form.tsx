'use client'

import {
	IconCircleCheck,
	IconExclamationCircle,
	IconSettings,
} from '@tabler/icons-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import { createOrganizationAction } from './actions'

export function OrganizationForm() {
	const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
		createOrganizationAction,
		() => {},
	)

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
				<Input name="name" type="text" id="name" />
				{errors?.name && (
					<p className="text-xs text-red-500 dark:text-red-400">
						{errors.name.at(0)}
					</p>
				)}
			</div>

			<div className="space-y-1">
				<Label htmlFor="domain">E-mail domain</Label>
				<Input
					name="domain"
					type="text"
					id="domain"
					inputMode="url"
					placeholder="example.com"
				/>
				{errors?.domain && (
					<p className="text-xs text-red-500 dark:text-red-400">
						{errors.domain.at(0)}
					</p>
				)}
			</div>

			<div className="space-y-1">
				<div className="flex select-none items-baseline space-x-2">
					<Checkbox
						name="shouldAttachUsersByDomain"
						id="shouldAttachUsersByDomain"
						className="translate-y-1"
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

			<Button type="submit" disabled={isPending} className="gap-2">
				{isPending ? (
					<>
						<IconSettings size={20} className="animate-spin duration-2000" />
						Saving organization...
					</>
				) : (
					'Save organization'
				)}
			</Button>
		</form>
	)
}
