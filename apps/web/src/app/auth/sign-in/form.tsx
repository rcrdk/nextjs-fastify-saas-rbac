'use client'

import {
	IconCircleCheck,
	IconExclamationCircle,
	IconMail,
} from '@tabler/icons-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { FormError } from '@/components/form-error'
import { FormGroup } from '@/components/form-group'
import { FormSubmitButton } from '@/components/form-submit-button'
import { HeaderAuth } from '@/components/header/header-auth'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'

import { AuthProvidersButtons } from '../providers-buttons'
import { signinWithEmailAndPassword } from './actions'

interface SignInFormProps {
	accountDeleted?: string | null
}

export function SignInForm({ accountDeleted }: SignInFormProps) {
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
	}, [success, message, router])

	return (
		<div className="space-y-4">
			<HeaderAuth title="Sign in to your account" />

			<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
				{accountDeleted && (
					<Alert variant="success">
						<IconCircleCheck size={20} />
						<AlertTitle>We are sorry to know that.</AlertTitle>
						<AlertDescription>{accountDeleted}</AlertDescription>
					</Alert>
				)}

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

				<FormGroup>
					<Label htmlFor="email">E-mail</Label>
					<Input
						name="email"
						type="email"
						id="email"
						autoComplete="email"
						defaultValue={searchParams.get('email') ?? ''}
						enterKeyHint="next"
					/>
					<FormError message={errors?.email} />
				</FormGroup>

				<FormGroup>
					<Label htmlFor="password">Password</Label>
					<Input
						name="password"
						type="password"
						id="password"
						autoComplete="current-password"
						enterKeyHint="send"
					/>
					<FormError message={errors?.password} />
				</FormGroup>

				<Link
					href="/auth/forgot-password"
					className="self-start text-xs font-medium text-foreground hover:underline"
				>
					Forgot your password?
				</Link>

				<FormSubmitButton loading={isPending}>
					<IconMail size={20} />
					Sign-in with e-mail
				</FormSubmitButton>

				<Button className="gap-2" variant="link" size="sm" asChild>
					<Link href="/auth/sign-up">Create new account</Link>
				</Button>
			</form>

			<AuthProvidersButtons />
		</div>
	)
}
