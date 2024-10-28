import { ProjectForm } from '@/app/(app)/organization/[slug]/project/form'
import { InterceptedDialogContent } from '@/components/intercepted-dialog-content'
import {
	Dialog,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'

export default function CreateProject() {
	return (
		<Dialog defaultOpen>
			<InterceptedDialogContent>
				<DialogHeader>
					<DialogTitle>Create a project</DialogTitle>
					<DialogDescription>Enter your new project data.</DialogDescription>
				</DialogHeader>

				<ProjectForm />
			</InterceptedDialogContent>
		</Dialog>
	)
}
