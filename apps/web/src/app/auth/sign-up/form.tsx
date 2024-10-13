'use client'

import {
	IconBrandGithub,
	IconExclamationCircle,
	IconSettings,
} from '@tabler/icons-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useFormState } from '@/hooks/use-form-state'

import { signInWithGitHub } from '../actions'
import { signUpAction } from './actions'

export function SignUpForm() {
	const router = useRouter()

	const [{ success, message, errors }, handleSubmit, isPending] = useFormState(
		signUpAction,
		() => {
			router.push('/auth/sign-in')
		},
	)

	return (
		<div className="space-y-4">
			<form onSubmit={handleSubmit} className="flex flex-col space-y-4">
				{!success && message && (
					<Alert variant="destructive">
						<IconExclamationCircle size={20} />
						<AlertTitle>Sign in has failed:</AlertTitle>
						<AlertDescription>{message}</AlertDescription>
					</Alert>
				)}

				<div className="space-y-1">
					<Label htmlFor="name">Name</Label>
					<Input name="name" type="text" id="name" />
					{errors?.name && (
						<p className="text-xs text-red-500 dark:text-red-400">
							{errors.name.at(0)}
						</p>
					)}
				</div>

				<div className="space-y-1">
					<Label htmlFor="email">E-mail</Label>
					<Input name="email" type="email" id="email" />
					{errors?.email && (
						<p className="text-xs text-red-500 dark:text-red-400">
							{errors.email.at(0)}
						</p>
					)}
				</div>

				<div className="space-y-1">
					<Label htmlFor="password">Password</Label>
					<Input name="password" type="password" id="password" />
					{errors?.password && (
						<p className="text-xs text-red-500 dark:text-red-400">
							{errors.password.at(0)}
						</p>
					)}
				</div>

				<div className="space-y-1">
					<Label htmlFor="password_confirmation">Confirm your password</Label>
					<Input
						name="password_confirmation"
						type="password"
						id="password_confirmation"
					/>
					{errors?.password_confirmation && (
						<p className="text-xs text-red-500 dark:text-red-400">
							{errors.password_confirmation.at(0)}
						</p>
					)}
				</div>

				<Button type="submit" disabled={isPending} className="gap-2">
					{isPending ? (
						<>
							<IconSettings size={20} className="animate-spin duration-2000" />
							Creating account...
						</>
					) : (
						'Create account'
					)}
				</Button>

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
