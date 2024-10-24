'use client'

import {
	IconBrandGithub,
	IconExclamationCircle,
	IconEye,
	IconEyeOff,
} from '@tabler/icons-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { FormError } from '@/components/form-error'
import { FormErrorPassword } from '@/components/form-error-password'
import { FormSubmitButton } from '@/components/form-submit-button'
import { HeaderAuth } from '@/components/header/header-auth'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useFormState } from '@/hooks/use-form-state'

import { signInWithGitHub } from '../actions'
import { signUpAction } from './actions'

export function SignUpForm() {
	const [showPassword, setShowPassword] = useState(false)

	const router = useRouter()

	const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
		signUpAction,
		{
			onSuccess() {
				router.push('/auth/verify-email')
			},
		},
	)

	return (
		<div className="space-y-4">
			<HeaderAuth title="Create your account" />

			<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
				{!success && message && (
					<Alert variant="destructive">
						<IconExclamationCircle size={20} />
						<AlertTitle>An error occurred:</AlertTitle>
						<AlertDescription>{message}</AlertDescription>
					</Alert>
				)}

				<div className="space-y-1">
					<Label htmlFor="name">Name</Label>
					<Input name="name" type="text" id="name" />
					<FormError message={errors?.name} />
				</div>

				<div className="space-y-1">
					<Label htmlFor="email">E-mail</Label>
					<Input name="email" type="email" id="email" />
					<FormError message={errors?.email} />
				</div>

				<div className="space-y-1">
					<Label htmlFor="password">Password</Label>
					<div className="relative">
						<Input
							name="password"
							type={showPassword ? 'text' : 'password'}
							id="password"
							autoComplete="off"
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

				<FormSubmitButton
					loading={isPending}
					loadingLabel="Creating account..."
				>
					Create account
				</FormSubmitButton>

				<Button className="gap-2" variant="link" size="sm" asChild>
					<Link href="/auth/sign-in">I already have an account</Link>
				</Button>
			</form>

			<form action={signInWithGitHub}>
				<Separator />

				<Button type="submit" variant="outline" className="w-full gap-2">
					<IconBrandGithub size={20} />
					Sign-up with GitHub
				</Button>
			</form>
		</div>
	)
}
