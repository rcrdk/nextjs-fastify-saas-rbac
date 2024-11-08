'use client'

import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { FormError } from '@/components/form-error'
import { FormGrid } from '@/components/form-grid'
import { FormGroup } from '@/components/form-group'
import { FormSubmitButton } from '@/components/form-submit-button'
import { CardContent, CardFooter, CardHelp } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import { authorizeOrganizationDomainAction } from './actions'

interface DomainFormProps {
	domainValidated: boolean
	initialData: {
		domain: string | null
		shouldAttachUsersByDomain: boolean
	}
}

export function DomainForm({ domainValidated, initialData }: DomainFormProps) {
	const [{ success, message, errors }, handleUpdate, isPending] = useFormState(
		authorizeOrganizationDomainAction,
		{
			resetStateMessage: true,
		},
	)

	useEffect(() => {
		if (!success && message) {
			toast.error(message, { id: 'update-domain' })
		}
		if (success && message) {
			toast.success(message, { id: 'update-domain' })
		}
	}, [success, message, isPending])

	return (
		<form onSubmit={handleUpdate} className="flex flex-col">
			<CardContent className="flex-grow space-y-5 p-5 lg:pl-7">
				<FormGrid
					className={
						domainValidated
							? '!block space-y-4 md:!grid md:space-y-0'
							: '!block space-y-4'
					}
				>
					<FormGroup>
						<Label htmlFor="domain">
							{domainValidated ? 'Domain configured:' : 'Domain:'}
						</Label>
						<Input
							name="domain"
							type="text"
							id="domain"
							inputMode="url"
							placeholder="example.com"
							spellCheck="false"
							autoComplete="off"
							defaultValue={initialData.domain ?? undefined}
							readOnly={domainValidated}
							enterKeyHint={domainValidated ? 'done' : 'send'}
						/>
						<FormError message={errors?.domain} />
					</FormGroup>

					<div
						className={`flex select-none items-baseline space-x-2 ${domainValidated ? 'self-end lg:col-span-2' : ''}`}
					>
						<Checkbox
							name="shouldAttachUsersByDomain"
							id="shouldAttachUsersByDomain"
							className="translate-y-1"
							defaultChecked={initialData.shouldAttachUsersByDomain}
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
				</FormGrid>
			</CardContent>

			<CardFooter className="lg:pl-7">
				<CardHelp>
					{domainValidated
						? 'Save organization domain settings. To change domain, you must remove the current one.'
						: 'Enter your domain ensuring that the validation code provied is set up on the DNS records.'}
				</CardHelp>

				<FormSubmitButton size="sm" loading={isPending}>
					{domainValidated ? 'Save' : 'Validate'}
				</FormSubmitButton>
			</CardFooter>
		</form>
	)
}
