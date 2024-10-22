import { InterceptedDialogContent } from '@/components/intercepted-dialog-content'
import {
	Dialog,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'

import { OrganizationForm } from '../../organization/form'

export default function CreateOrganization() {
	return (
		<Dialog defaultOpen>
			<InterceptedDialogContent>
				<DialogHeader>
					<DialogTitle>Create organization</DialogTitle>
					<DialogDescription>
						Enter your new organization data.
					</DialogDescription>
				</DialogHeader>

				<OrganizationForm />
			</InterceptedDialogContent>
		</Dialog>
	)
}
