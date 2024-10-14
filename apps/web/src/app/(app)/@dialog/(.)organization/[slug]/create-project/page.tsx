import { ProjectForm } from '@/app/(app)/organization/[slug]/create-project/form'
import { InterceptedDialogContent } from '@/components/intercepted-dialog-content'
import { Dialog, DialogHeader, DialogTitle } from '@/components/ui/dialog'

export default function CreateProject() {
	return (
		<Dialog defaultOpen>
			<InterceptedDialogContent>
				<DialogHeader className="flex flex-row items-center justify-between">
					<DialogTitle>Create a project</DialogTitle>
				</DialogHeader>

				<ProjectForm />
			</InterceptedDialogContent>
		</Dialog>
	)
}
