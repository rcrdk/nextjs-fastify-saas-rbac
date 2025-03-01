'use client'

import { DialogPortal } from '@radix-ui/react-dialog'
import type { JSX, ReactNode, RefObject } from 'react'

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
	triggerButton?: JSX.Element
	actionForm: JSX.Element
	open: boolean
	onOpenChange: () => void
}

export function confirmDialogActionOnPromptEnter(
	event: React.KeyboardEvent<HTMLInputElement>,
	confirmation: string,
	form: RefObject<HTMLFormElement | null>,
) {
	const pressedEnter = event.key === 'Enter'
	const isConfirmed = event.currentTarget.value === confirmation

	if (pressedEnter && isConfirmed && form) {
		form.current?.requestSubmit()
	}
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
			{triggerButton && <DialogTrigger asChild>{triggerButton}</DialogTrigger>}

			<DialogPortal>
				<DialogContent className="bottom-2 top-auto translate-y-0 data-[state=closed]:slide-out-to-bottom-[48%] data-[state=open]:slide-in-from-bottom-[48%] sm:bottom-auto sm:top-[50%] sm:w-[410px] sm:translate-y-[-50%] sm:data-[state=closed]:slide-out-to-top-[48%] sm:data-[state=open]:slide-in-from-top-[48%]">
					<DialogHeader>
						<DialogTitle className="text-balance">{title}</DialogTitle>
						<DialogDescription className="text-balance">
							{description}
						</DialogDescription>
					</DialogHeader>

					{children}

					<DialogFooter>
						<Button type="button" onClick={onOpenChange} variant="outline">
							Cancel
						</Button>

						{actionForm}
					</DialogFooter>
				</DialogContent>
			</DialogPortal>
		</Dialog>
	)
}
