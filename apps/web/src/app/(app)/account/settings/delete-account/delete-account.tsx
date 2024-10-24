import { IconUserMinus } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

export async function AccountDelete() {
	return (
		<Card className="items-center justify-between md:flex">
			<CardHeader>
				<CardTitle>Delete account</CardTitle>
				<CardDescription>
					By deleting your account you will be leaving organizations that are in
					and organizations that you owns will be deleted along with all data.
				</CardDescription>
			</CardHeader>

			<CardContent className="md:p-5">
				<Button variant="destructive" className="w-full gap-2">
					<IconUserMinus className="mr-2" stroke={1.5} />
					Delete my account
				</Button>
			</CardContent>
		</Card>
	)
}
