import { IconBrandGithub } from '@tabler/icons-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function SignUpPage() {
	return (
		<form action="" className="flex flex-col space-y-4">
			<div className="space-y-1">
				<Label htmlFor="name">Name</Label>
				<Input name="name" type="text" id="name" />
			</div>

			<div className="space-y-1">
				<Label htmlFor="email">E-mail</Label>
				<Input name="email" type="email" id="email" />
			</div>

			<div className="space-y-1">
				<Label htmlFor="password">Password</Label>
				<Input name="password" type="password" id="password" />
			</div>

			<div className="space-y-1">
				<Label htmlFor="confirm_password">Confirm your password</Label>
				<Input name="confirm_password" type="password" id="confirm_password" />
			</div>

			<Button className="gap-2" type="submit">
				Create account
			</Button>

			<Button className="gap-2" variant="link" size="sm" asChild>
				<Link href="/auth/sign-in">I already have an account</Link>
			</Button>

			<Separator />

			<Button className="gap-2" variant="outline">
				<IconBrandGithub size={20} />
				Sign-up with GitHub
			</Button>
		</form>
	)
}
