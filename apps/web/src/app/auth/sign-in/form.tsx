'use client'

import {
	IconBrandGithub,
	IconCircleCheck,
	IconExclamationCircle,
	IconMail,
} from '@tabler/icons-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { FormError } from '@/components/form-error'
import { FormSubmitButton } from '@/components/form-submit-button'
import { HeaderAuth } from '@/components/header/header-auth'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useFormState } from '@/hooks/use-form-state'

import { signInWithGitHub } from '../actions'
import { signinWithEmailAndPassword } from './actions'

export function SignInForm() {
	const router = useRouter()
	const searchParams = useSearchParams()

	const passwordRecoveredSuccess = searchParams.get('password')

	const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
		signinWithEmailAndPassword,
	)

	useEffect(() => {
		if (success) router.push('/')

		if (!success && message && message.includes('verified e-mail')) {
			router.push('/auth/verify-email')
		}
	}, [success, message])

	return (
		<div className="space-y-4">
			<HeaderAuth title="Sign in to your account" />

			<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
				{passwordRecoveredSuccess && !message && (
					<Alert variant="success">
						<IconCircleCheck size={20} />
						<AlertTitle>Success:</AlertTitle>
						<AlertDescription>
							Your password was recovered, now you can authenticate again:
						</AlertDescription>
					</Alert>
				)}

				{!success && message && !message.includes('verified e-mail') && (
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
						defaultValue={searchParams.get('email') ?? ''}
					/>
					<FormError message={errors?.email} />
				</div>

				<div className="space-y-1">
					<Label htmlFor="password">Password</Label>
					<Input name="password" type="password" id="password" />
					<FormError message={errors?.password} />
				</div>

				<Link
					href="/auth/forgot-password"
					className="self-start text-xs font-medium text-foreground hover:underline"
				>
					Forgot your password?
				</Link>

				<FormSubmitButton loading={isPending} loadingLabel="Signing in...">
					<IconMail size={20} />
					Sign-in with e-mail
				</FormSubmitButton>

				<Button className="gap-2" variant="link" size="sm" asChild>
					<Link href="/auth/sign-up">Create new account</Link>
				</Button>
			</form>

			<Separator />

			<form action={signInWithGitHub}>
				<Button type="submit" variant="outline" className="w-full gap-2">
					<IconBrandGithub size={20} />
					Sign-in with GitHub
				</Button>
			</form>
		</div>
	)
}
