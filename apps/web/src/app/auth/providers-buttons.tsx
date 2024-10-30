'use client'

import { IconBrandGithub, IconBrandGoogleFilled } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

import { signInWithGitHubAction, signInWithGoogleAction } from './actions'

export function AuthProvidersButtons() {
	return (
		<>
			<Separator />

			<div className="flex flex-col gap-2">
				<form action={signInWithGitHubAction}>
					<Button type="submit" variant="outline" className="w-full gap-2">
						<IconBrandGithub size={20} />
						Sign-in with GitHub
					</Button>
				</form>

				<form action={signInWithGoogleAction}>
					<Button type="submit" variant="outline" className="w-full gap-2">
						<IconBrandGoogleFilled size={20} />
						Sign-in with Google
					</Button>
				</form>
			</div>
		</>
	)
}
