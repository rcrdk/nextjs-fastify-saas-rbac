'use client'

import { IconExclamationCircle } from '@tabler/icons-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { FormError } from '@/components/form-error'
import { FormSubmitButton } from '@/components/form-submit-button'
import { HeaderAuth } from '@/components/header/header-auth'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import { verifyEmailAndAuthenticateAction } from './actions'
import { ResendEmailValidationCode } from './resend-email-validation-code'

export function VerifyEmailForm() {
	const searchParams = useSearchParams()
	const emailParam = searchParams.get('email')
	const code = searchParams.get('code')

	const [email, setEmail] = useState(emailParam ?? '')

	const router = useRouter()

	const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
		verifyEmailAndAuthenticateAction,
		{
			onSuccess() {
				router.push('/')
			},
		},
	)

	return (
		<div className="space-y-4">
			<HeaderAuth
				title="Verify your e-mail"
				description="An e-mail was sent when you signed up with the validation code that is valid for 5 minutes. Check out your inbox to proceed or try to send a new validation code below."
			/>

			<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
				{!success && message && (
					<Alert variant="destructive">
						<IconExclamationCircle size={20} />
						<AlertTitle>An error occurred:</AlertTitle>
						<AlertDescription>{message}</AlertDescription>
					</Alert>
				)}

				<div className="space-y-1">
					<Label htmlFor="email">E-mail</Label>
					<Input
						name="email"
						type="email"
						id="email"
						onChange={(e) => setEmail(e.target.value)}
						defaultValue={email}
					/>
					<FormError message={errors?.email} />
				</div>

				<div className="space-y-1">
					<Label htmlFor="password">Password</Label>
					<Input
						name="password"
						type="password"
						id="password"
						autoComplete="off"
					/>
					<FormError message={errors?.password} />
				</div>

				<div className="space-y-1">
					<Label htmlFor="code">Validation code</Label>
					<Input
						name="code"
						type="text"
						id="code"
						spellCheck="false"
						autoComplete="off"
						defaultValue={code ?? undefined}
					/>
					<FormError message={errors?.code} />
				</div>

				<FormSubmitButton
					loading={isPending}
					loadingLabel="Verifying account..."
				>
					Verify and access my account
				</FormSubmitButton>
			</form>

			<ResendEmailValidationCode email={email} />
		</div>
	)
}
