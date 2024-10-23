'use client'

import { IconExclamationCircle, IconEye, IconEyeOff } from '@tabler/icons-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { FormError } from '@/components/form-error'
import { FormErrorPassword } from '@/components/form-error-password'
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
		() => {
			router.push('/auth/sign-in?password=recovered')
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
					<Input
						name="code"
						type="text"
						id="code"
						spellCheck={false}
						defaultValue={code ?? undefined}
					/>
					<FormError message={errors?.code} />
				</div>

				<div className="space-y-1">
					<Label htmlFor="password">Password</Label>
					<div className="relative">
						<Input
							name="password"
							type={showPassword ? 'text' : 'password'}
							id="password"
						/>
						<Button
							type="button"
							size="iconInput"
							variant="ghost"
							title="Copy attribute"
							onClick={() => setShowPassword((prev) => !prev)}
						>
							{showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
						</Button>
					</div>
					<FormErrorPassword list={errors?.password} />
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
		</div>
	)
}
