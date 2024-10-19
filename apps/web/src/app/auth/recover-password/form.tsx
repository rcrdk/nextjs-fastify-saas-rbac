'use client'

import { IconCircleCheck, IconExclamationCircle } from '@tabler/icons-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { FormError } from '@/components/form-error'
import { FormSubmitButton } from '@/components/form-submit-button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import { recoverPasswordAction } from './actions'

export function RecoverPasswordForm() {
	const searchParams = useSearchParams()
	const alertRequested = searchParams.get('requested')
	const email = searchParams.get('email')

	const router = useRouter()

	const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
		recoverPasswordAction,
		() => {
			router.push('/auth/sign-in?password=recovered')
		},
	)

	return (
		<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
			{alertRequested && !message && (
				<Alert variant="success">
					<IconCircleCheck size={20} />
					<AlertTitle>Success:</AlertTitle>
					<AlertDescription>
						A recovery code has been sent to your email and it is valid for 5
						minutes.
					</AlertDescription>
				</Alert>
			)}

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
					defaultValue={email ?? undefined}
				/>
				<FormError message={errors?.email} />
			</div>

			<div className="space-y-1">
				<Label htmlFor="code">Recovery code</Label>
				<Input name="code" type="text" id="code" spellCheck={false} />
				<FormError message={errors?.code} />
			</div>

			<div className="space-y-1">
				<Label htmlFor="password">Password</Label>
				<Input name="password" type="password" id="password" />
				<FormError message={errors?.password} />
			</div>

			<div className="space-y-1">
				<Label htmlFor="password_confirmation">Confirm your password</Label>
				<Input
					name="password_confirmation"
					type="password"
					id="password_confirmation"
				/>
				<FormError message={errors?.password_confirmation} />
			</div>

			<FormSubmitButton loading={isPending} loadingLabel="Processing...">
				Recover my password
			</FormSubmitButton>

			<Button className="gap-2" variant="link" size="sm" asChild>
				<Link href="/auth/sign-in">Take me to sign-in</Link>
			</Button>
		</form>
	)
}
