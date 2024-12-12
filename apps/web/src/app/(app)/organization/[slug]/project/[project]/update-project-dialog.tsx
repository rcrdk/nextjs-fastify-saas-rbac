'use client'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import type { GetProjectItemResponse } from '@/http/projects/get-project'

import { ProjectForm } from '../form'

interface UpdateProjectDialogProps {
	project: GetProjectItemResponse
	open: boolean
	onOpenChange: () => void
}

export function UpdateProjectDialog({
	project,
	open,
	onOpenChange,
}: UpdateProjectDialogProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit project</DialogTitle>
					<DialogDescription>Change project information.</DialogDescription>
				</DialogHeader>

				<ProjectForm
					isUpdating
					initialData={{
						id: project.id,
						name: project.name,
						description: project.description,
					}}
					onUpdateSuccess={onOpenChange}
				/>
			</DialogContent>
		</Dialog>
	)
}
