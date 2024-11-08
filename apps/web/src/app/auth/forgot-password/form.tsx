'use client'

import { IconExclamationCircle } from '@tabler/icons-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { FormError } from '@/components/form-error'
import { FormGroup } from '@/components/form-group'
import { FormSubmitButton } from '@/components/form-submit-button'
import { HeaderAuth } from '@/components/header/header-auth'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import { forgotPasswordAction } from './actions'

export function ForgotPasswordForm() {
	const router = useRouter()

	const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
		forgotPasswordAction,
		{
			onSuccess() {
				router.push(`/auth/recover-password`)
			},
		},
	)

	return (
		<div className="space-y-4">
			<HeaderAuth
				title="Forgot my password"
				description="An e-mail will be send to your inbox with a recovery code valid for 5 minutes."
			/>

			<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
				{!success && message && (
					<Alert variant="destructive">
						<IconExclamationCircle size={20} />
						<AlertTitle>An error occurred:</AlertTitle>
						<AlertDescription>{message}</AlertDescription>
					</Alert>
				)}

				<FormGroup>
					<Label htmlFor="email">E-mail</Label>
					<Input
						name="email"
						type="email"
						id="email"
						autoComplete="email"
						enterKeyHint="send"
					/>
					<FormError message={errors?.email} />
				</FormGroup>

				<FormSubmitButton loading={isPending}>
					Request password recover
				</FormSubmitButton>

				<Button className="gap-2" variant="link" size="sm" asChild>
					<Link href="/auth/sign-in">Take me back to sign-in</Link>
				</Button>
			</form>
		</div>
	)
}
