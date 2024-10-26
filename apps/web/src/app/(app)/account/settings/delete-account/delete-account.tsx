import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import { DeleteAccountDialog } from './dialog'

export async function DeleteAccount() {
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
				<DeleteAccountDialog />
			</CardContent>
		</Card>
	)
}
