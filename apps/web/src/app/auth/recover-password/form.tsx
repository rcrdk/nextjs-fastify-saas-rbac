'use client'

import { IconExclamationCircle, IconEye, IconEyeOff } from '@tabler/icons-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { FormError } from '@/components/form-error'
import { FormErrorPassword } from '@/components/form-error-password'
import { FormGroup } from '@/components/form-group'
import { FormSubmitButton } from '@/components/form-submit-button'
import { HeaderAuth } from '@/components/header/header-auth'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import { recoverPasswordAction } from './actions'

export function RecoverPasswordForm() {
	const [showPassword, setShowPassword] = useState(false)

	const searchParams = useSearchParams()
	const email = searchParams.get('email')
	const code = searchParams.get('code')

	const router = useRouter()

	const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
		recoverPasswordAction,
		{
			onSuccess() {
				router.push('/auth/sign-in?password=recovered')
			},
		},
	)

	return (
		<div className="space-y-4">
			<HeaderAuth
				title="Create new password"
				description="An e-mail was sent with the recovery code and it is valid for 5 minutes. Check out your inbox to proceed."
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
						defaultValue={email ?? undefined}
						enterKeyHint="next"
					/>
					<FormError message={errors?.email} />
				</FormGroup>

				<FormGroup>
					<Label htmlFor="code">Recovery code</Label>
					<Input
						name="code"
						type="text"
						id="code"
						autoComplete="one-time-code"
						spellCheck="false"
						defaultValue={code ?? undefined}
						enterKeyHint="next"
					/>
					<FormError message={errors?.code} />
				</FormGroup>

				<FormGroup>
					<Label htmlFor="password">Password</Label>
					<div className="relative">
						<Input
							name="password"
							type={showPassword ? 'text' : 'password'}
							id="password"
							autoComplete="new-password"
							enterKeyHint="next"
						/>
						<Button
							type="button"
							size="iconInput"
							variant="ghost"
							title={showPassword ? 'Hide password' : 'Show password'}
							onClick={() => setShowPassword((prev) => !prev)}
						>
							{showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
						</Button>
					</div>
					<FormErrorPassword list={errors?.password} />
				</FormGroup>

				<FormGroup>
					<Label htmlFor="password_confirmation">Confirm your password</Label>
					<Input
						name="password_confirmation"
						type="password"
						id="password_confirmation"
						autoComplete="new-password"
						enterKeyHint="send"
					/>
					<FormError message={errors?.password_confirmation} />
				</FormGroup>

				<FormSubmitButton loading={isPending}>
					Recover my password
				</FormSubmitButton>

				<Button className="gap-2" variant="link" size="sm" asChild>
					<Link href="/auth/sign-in">Take me to sign-in</Link>
				</Button>
			</form>
		</div>
	)
}
