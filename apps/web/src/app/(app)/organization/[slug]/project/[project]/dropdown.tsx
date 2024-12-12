'use client'

import { IconCircleX, IconEditCircle, IconSettings } from '@tabler/icons-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { GetProjectItemResponse } from '@/http/projects/get-project'

import { DeleteProjectDialog } from './delete-project-dialog'
import { UpdateProjectDialog } from './update-project-dialog'

interface ProjectDropdownSettingsProps {
	organizationSlug: string
	project: GetProjectItemResponse
	permissions: {
		canUpdate: boolean
		canDelete: boolean
	}
}

export function ProjectDropdownSettings({
	organizationSlug,
	project,
	permissions,
}: ProjectDropdownSettingsProps) {
	const [dialogEdit, setDialogEdit] = useState(false)
	const [dialogDelete, setDialogDelete] = useState(false)

	function handleToggleDialogEdit() {
		setDialogEdit((prev) => !prev)
	}

	function handleToggleDialogDelete() {
		setDialogDelete((prev) => !prev)
	}

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						title="Configurações"
						className="flex-shrink-0 self-center sm:self-start"
					>
						<IconSettings size={20} />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end">
					<DropdownMenuItem
						className="cursor-pointer gap-2 disabled:cursor-default"
						disabled={!permissions}
						onClick={handleToggleDialogEdit}
					>
						<IconEditCircle size={20} />
						Edit project
					</DropdownMenuItem>

					<DropdownMenuSeparator />

					<DropdownMenuItem
						className="cursor-pointer gap-2 disabled:cursor-default"
						disabled={!permissions}
						onClick={handleToggleDialogDelete}
					>
						<IconCircleX size={20} />
						Remove project
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<DeleteProjectDialog
				open={dialogDelete}
				organizationSlug={organizationSlug}
				onOpenChange={handleToggleDialogDelete}
				projectId={project.id}
			/>

			<UpdateProjectDialog
				project={project}
				open={dialogEdit}
				onOpenChange={handleToggleDialogEdit}
			/>
		</>
	)
}
