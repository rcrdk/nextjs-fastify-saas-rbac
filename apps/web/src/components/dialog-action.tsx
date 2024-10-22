'use client'

import { DialogPortal } from '@radix-ui/react-dialog'
import { ReactNode } from 'react'

import { Button } from './ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog'

interface DialogActionProps {
	title: string
	description: string
	children?: ReactNode
	triggerButton: JSX.Element
	actionForm: JSX.Element
	open: boolean
	onOpenChange: () => void
}

export function DialogAction({
	title,
	description,
	children,
	open,
	onOpenChange,
	triggerButton,
	actionForm,
}: DialogActionProps) {
	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>{triggerButton}</DialogTrigger>

			<DialogPortal>
				<DialogContent className="max-w-[91vw] rounded-lg sm:max-w-96">
					<DialogHeader>
						<DialogTitle>{title}</DialogTitle>
						<DialogDescription>{description}</DialogDescription>
					</DialogHeader>

					{children}

					<DialogFooter>
						<Button type="button" onClick={onOpenChange} variant="ghost">
							Cancel
						</Button>

						{actionForm}
					</DialogFooter>
				</DialogContent>
			</DialogPortal>
		</Dialog>
	)
}
