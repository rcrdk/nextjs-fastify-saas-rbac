import { auth } from '@/auth'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import { AvatarForm } from './form'

export async function Avatar() {
	const { user } = await auth()

	return (
		<Card className="flex">
			<CardHeader className="flex-grow">
				<CardTitle>Avatar</CardTitle>
				<CardDescription className="text-balance">
					This is your avatar, by default we will try to use a avatar from a
					third-party service that you signed in or from Gravatar. An avatar is
					optional but strongly recommended.
				</CardDescription>
			</CardHeader>

			<CardContent className="p-5 pl-0 md:pl-5 md:pr-8">
				<AvatarForm
					initialData={{
						userId: user.id,
						email: user.email,
						avatarUrl: user.avatarUrl,
					}}
				/>
			</CardContent>
		</Card>
	)
}
