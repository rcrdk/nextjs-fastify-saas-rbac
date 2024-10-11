import { IconBrandGithub, IconMail } from '@tabler/icons-react'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export default function SignInPage() {
	return (
		<form action="" className="flex flex-col space-y-4">
			<div className="space-y-1">
				<Label htmlFor="email">E-mail</Label>
				<Input name="email" type="email" id="email" />
			</div>

			<div className="space-y-1">
				<Label htmlFor="password">Password</Label>
				<Input name="password" type="password" id="password" />
			</div>

			<Link
				href="/auth/forgot-password"
				className="self-start text-xs font-medium text-foreground hover:underline"
			>
				Forgot your password?
			</Link>

			<Button className="gap-2" type="submit">
				<IconMail size={20} />
				Sign-in with e-mail
			</Button>

			<Separator />

			<Button className="gap-2" variant="outline">
				<IconBrandGithub size={20} />
				Sign-in with GitHub
			</Button>
		</form>
	)
}
