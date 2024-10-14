import { Metadata } from 'next'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const metadata: Metadata = {
	title: 'Password recover',
}

export default function ForgotPasswordPage() {
	return (
		<form action="" className="flex flex-col space-y-4">
			<div className="space-y-1">
				<Label htmlFor="email">E-mail</Label>
				<Input name="email" type="email" id="email" />
			</div>

			<Button className="gap-2" type="submit">
				Revover password
			</Button>

			<Button className="gap-2" variant="link" size="sm" asChild>
				<Link href="/auth/sign-in">Take me back to sign-in</Link>
			</Button>
		</form>
	)
}
