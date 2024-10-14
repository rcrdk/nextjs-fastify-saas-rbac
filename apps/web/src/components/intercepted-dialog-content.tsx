'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { IconX } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import * as React from 'react'

import { cn } from '@/lib/utils'

import { DialogOverlay, DialogPortal } from './ui/dialog'

export const InterceptedDialogContent = React.forwardRef<
	React.ElementRef<typeof DialogPrimitive.Content>,
	React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => {
	const router = useRouter()

	function onDismiss() {
		setTimeout(() => router.back(), 300)
	}

	return (
		<DialogPortal>
			<DialogOverlay />
			<DialogPrimitive.Content
				ref={ref}
				className={cn(
					'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] flex-wrap gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
					className,
				)}
				onEscapeKeyDown={onDismiss}
				onPointerDownOutside={onDismiss}
				{...props}
			>
				{children}
				<DialogPrimitive.Close asChild>
					<button
						type="button"
						onClick={onDismiss}
						className="absolute right-6 top-6 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-primary"
					>
						<IconX size={20} />
						<span className="sr-only">Close</span>
					</button>
				</DialogPrimitive.Close>
			</DialogPrimitive.Content>
		</DialogPortal>
	)
})

InterceptedDialogContent.displayName = DialogPrimitive.Content.displayName
