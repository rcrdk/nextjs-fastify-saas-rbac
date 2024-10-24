'use client'

import { IconCopy } from '@tabler/icons-react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

import { FormError } from '@/components/form-error'
import { FormSubmitButton } from '@/components/form-submit-button'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'
import { GetOrganizationItemRequest } from '@/http/get-organization'
import { copyTextToClipboard } from '@/utils/copy-to-clipboard'

import { authorizeOrganizationDomainAction } from '../actions'
import { RemoveDomain } from './domain-remove-button'

interface DomainProps {
	organization: GetOrganizationItemRequest
}

export function Domain({ organization }: DomainProps) {
	const [{ success, message, errors }, handleUpdate, isPending] = useFormState(
		authorizeOrganizationDomainAction,
	)

	useEffect(() => {
		if (!success && message) {
			toast.error(message, { id: 'invite' })
		}
		if (success && message) {
			toast.success(message, { id: 'invite' })
		}
	}, [success, message, isPending])

	const hasOrganizationDomainValidated =
		!!organization.domain && !!organization.domainValidatedAt

	const submitButtonLabel = hasOrganizationDomainValidated
		? {
				default: 'Save domain',
				loading: 'Saving dmain',
			}
		: {
				default: 'Validate and save domain',
				loading: 'Setting up domain...',
			}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Domain</CardTitle>
				<CardDescription>Set up your organization domain.</CardDescription>
			</CardHeader>

			<CardContent>
				<div className="flex flex-col space-y-4">
					{hasOrganizationDomainValidated && (
						<RemoveDomain domain={organization.domain} />
					)}

					<form onSubmit={handleUpdate} className="flex flex-col space-y-4">
						{!hasOrganizationDomainValidated && (
							<Card className="p-4 text-sm text-muted-foreground">
								<Label className="text-foreground">
									Set up your DNS Records:
								</Label>
								<p className="mb-4 mt-1 text-balance">
									First up, you will need to set up the DNS records in your
									domain configurations by creating a new entry with the details
									below. Please ensure the changes are saved and allow some time
									for them to propagate.
								</p>
								<div className="grid grid-cols-12 gap-4">
									<div className="relative col-span-6 space-y-1 lg:col-span-2 xl:col-span-3">
										<Label>Name:</Label>
										<Input defaultValue="_saas" className="pr-10" readOnly />
										<Button
											type="button"
											size="iconInput"
											variant="ghost"
											title="Copy attribute"
											onClick={() => copyTextToClipboard('_saas')}
										>
											<IconCopy size={20} />
										</Button>
									</div>
									<div className="relative col-span-6 space-y-1 lg:col-span-2 xl:col-span-3">
										<Label>Type:</Label>
										<Input defaultValue="TXT" className="pr-10" readOnly />
										<Button
											type="button"
											size="iconInput"
											variant="ghost"
											title="Copy attribute"
											onClick={() => copyTextToClipboard('TXT')}
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
											size="iconInput"
											variant="ghost"
											title="Copy attribute"
											onClick={() =>
												copyTextToClipboard(
													`saas-domain-verification=${organization.domainValidationId}`,
													'Verification Code',
												)
											}
										>
											<IconCopy size={20} />
										</Button>
									</div>
								</div>
							</Card>
						)}

						<div className="space-y-1">
							<Label htmlFor="domain">
								{hasOrganizationDomainValidated
									? 'Domain configured:'
									: 'Domain:'}
							</Label>
							<Input
								name="domain"
								type="text"
								id="domain"
								inputMode="url"
								placeholder="example.com"
								spellCheck={false}
								autoComplete="off"
								defaultValue={organization.domain ?? undefined}
								readOnly={hasOrganizationDomainValidated}
							/>
							<FormError message={errors?.domain} />
						</div>

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

						<FormSubmitButton
							loading={isPending}
							loadingLabel={submitButtonLabel.loading}
							className="sm:min-w-80 sm:self-center"
							variant="secondary"
						>
							{submitButtonLabel.default}
						</FormSubmitButton>
					</form>
				</div>
			</CardContent>
		</Card>
	)
}
