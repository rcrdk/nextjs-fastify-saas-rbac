'use client'

import {
	IconCircleCheck,
	IconCircleX,
	IconCopy,
	IconExclamationCircle,
} from '@tabler/icons-react'
import toast from 'react-hot-toast'

import { FormError } from '@/components/form-error'
import { FormSubmitButton } from '@/components/form-submit-button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'
import { GetOrganizationItemRequest } from '@/http/get-organization'

import {
	authorizeOrganizationDomainAction,
	removeOrganizationDomainAction,
} from './actions'

interface DomainSettingsProps {
	organization: GetOrganizationItemRequest
}

export function DomainSettings({ organization }: DomainSettingsProps) {
	// api: on create and update organizations: remove references of domain

	const [
		{ success: successUpdate, message: messageUpdate, errors: errorsUpdate },
		handleUpdate,
		isPendingUpdate,
	] = useFormState(authorizeOrganizationDomainAction)

	const [
		{ success: successRemove, message: messageRemove },
		handleRemove,
		isPendingRemove,
	] = useFormState(removeOrganizationDomainAction)

	const hasOrganizationDomainValidated =
		organization.domain && organization.domainValidatedAt

	const submitButtonLabel = hasOrganizationDomainValidated
		? {
				default: 'Save domain',
				loading: 'Saving dmain',
			}
		: {
				default: 'Validate and save domain',
				loading: 'Setting up domain...',
			}

	async function handleCopy(attribute: string) {
		try {
			await navigator.clipboard.writeText(attribute)
			toast(
				<span>
					<b className="font-semibold">"{attribute}"</b> was copied to your
					clipboard.
				</span>,
			)
		} catch (error) {
			console.error('Unable to copy to clipboard: ', error)
		}
	}

	return (
		<div className="flex flex-col space-y-4">
			{!successUpdate && messageUpdate && (
				<Alert variant="destructive">
					<IconExclamationCircle size={20} />
					<AlertTitle>An error occurred:</AlertTitle>
					<AlertDescription>{messageUpdate}</AlertDescription>
				</Alert>
			)}

			{successUpdate && messageUpdate && (
				<Alert variant="success">
					<IconCircleCheck size={20} />
					<AlertTitle>Success:</AlertTitle>
					<AlertDescription>{messageUpdate}</AlertDescription>
				</Alert>
			)}

			{!successRemove && messageRemove && (
				<Alert variant="destructive">
					<IconExclamationCircle size={20} />
					<AlertTitle>An error occurred:</AlertTitle>
					<AlertDescription>{messageRemove}</AlertDescription>
				</Alert>
			)}

			{successRemove && messageRemove && (
				<Alert variant="success">
					<IconCircleCheck size={20} />
					<AlertTitle>Success:</AlertTitle>
					<AlertDescription>{messageRemove}</AlertDescription>
				</Alert>
			)}

			{hasOrganizationDomainValidated && (
				<Card className="flex flex-col items-start justify-between gap-4 p-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:gap-6">
					<div>
						<Label className="text-foreground">Domain configured:</Label>
						<p className="mt-1 text-balance">
							You have {organization.domain} domain configured for your
							organization. In order to change domain, you must remove the
							current one.
						</p>
					</div>

					<form onSubmit={handleRemove}>
						<FormSubmitButton
							variant="destructive"
							className="w-80 gap-2"
							loading={isPendingRemove}
							loadingLabel="Removing domain..."
						>
							<IconCircleX size={20} />
							Remove Organization Domain
						</FormSubmitButton>
					</form>
				</Card>
			)}

			<form onSubmit={handleUpdate} className="flex flex-col space-y-4">
				{!hasOrganizationDomainValidated && (
					<>
						<Card className="p-4 text-sm text-muted-foreground">
							<Label className="text-foreground">
								Set up your DNS Records:
							</Label>
							<p className="mb-4 mt-1 text-balance">
								First up, you will need to set up the DNS records in your domain
								configurations by creating a new entry with the details below.
								Please ensure the changes are saved and allow some time for them
								to propagate.
							</p>
							<div className="grid grid-cols-12 gap-4">
								<div className="relative col-span-6 space-y-1 lg:col-span-2 xl:col-span-3">
									<Label>Name:</Label>
									<Input defaultValue="_saas" className="pr-10" readOnly />
									<Button
										type="button"
										size="icon"
										variant="ghost"
										className="absolute bottom-0 right-0"
										title="Copy attribute"
										onClick={() => handleCopy('_saas')}
									>
										<IconCopy size={20} />
									</Button>
								</div>
								<div className="relative col-span-6 space-y-1 lg:col-span-2 xl:col-span-3">
									<Label>Type:</Label>
									<Input defaultValue="TXT" className="pr-10" readOnly />
									<Button
										type="button"
										size="icon"
										variant="ghost"
										className="absolute bottom-0 right-0"
										title="Copy attribute"
										onClick={() => handleCopy('TXT')}
									>
										<IconCopy size={20} />
									</Button>
								</div>
								<div className="relative col-span-12 space-y-1 lg:col-span-8 xl:col-span-6">
									<Label>Value:</Label>
									<Input
										defaultValue={`saas-domain-verification=${organization.domainValidationId}`}
										className="pr-10"
										readOnly
									/>
									<Button
										type="button"
										size="icon"
										variant="ghost"
										className="absolute bottom-0 right-0"
										title="Copy attribute"
										onClick={() =>
											handleCopy(
												`saas-domain-verification=${organization.domainValidationId}`,
											)
										}
									>
										<IconCopy size={20} />
									</Button>
								</div>
							</div>
						</Card>

						<div className="space-y-1">
							<Label htmlFor="domain">Domain</Label>
							<Input
								name="domain"
								type="text"
								id="domain"
								inputMode="url"
								placeholder="example.com"
								spellCheck={false}
								autoComplete="off"
								defaultValue={organization.domain ?? undefined}
							/>
							<FormError message={errorsUpdate?.domain} />
						</div>
					</>
				)}

				<div>
					{hasOrganizationDomainValidated && (
						<input
							type="hidden"
							name="domain"
							defaultValue={organization.domain ?? undefined}
						/>
					)}

					<div className="flex select-none items-baseline space-x-2">
						<Checkbox
							name="shouldAttachUsersByDomain"
							id="shouldAttachUsersByDomain"
							className="translate-y-1"
							defaultChecked={organization.shouldAttachUsersByDomain}
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

				<FormSubmitButton
					loading={isPendingUpdate}
					loadingLabel={submitButtonLabel.loading}
				>
					{submitButtonLabel.default}
				</FormSubmitButton>
			</form>
		</div>
	)
}
