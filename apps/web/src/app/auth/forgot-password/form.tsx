'use client'

import { IconExclamationCircle } from '@tabler/icons-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { FormError } from '@/components/form-error'
import { FormSubmitButton } from '@/components/form-submit-button'
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
		() => {
			router.push(`/auth/recover-password?requested=true`)
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

			<div className="space-y-1">
				<Label htmlFor="email">E-mail</Label>
				<Input name="email" type="email" id="email" />
				<FormError message={errors?.email} />
			</div>

			<FormSubmitButton
				loading={isPending}
				loadingLabel="Requesting recover..."
			>
				Request password recover
			</FormSubmitButton>

			<Button className="gap-2" variant="link" size="sm" asChild>
				<Link href="/auth/sign-in">Take me back to sign-in</Link>
			</Button>
		</form>
	)
}
