import { InterceptedDialogContent } from '@/components/intercepted-dialog-content'
import { Dialog, DialogHeader, DialogTitle } from '@/components/ui/dialog'

import { OrganizationForm } from '../../create-organization/form'

export default function CreateOrganization() {
	return (
		<Dialog defaultOpen>
			<InterceptedDialogContent>
				<DialogHeader className="flex flex-row items-center justify-between">
					<DialogTitle>Create organization</DialogTitle>
				</DialogHeader>

				<OrganizationForm />
			</InterceptedDialogContent>
		</Dialog>
	)
}
