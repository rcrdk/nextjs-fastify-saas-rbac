'use client'

import { IconCopy } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { copyTextToClipboard } from '@/utils/copy-to-clipboard'

interface DomainDnsSettingsProps {
	code: string | null
}

export function DomainDnsSettings({ code }: DomainDnsSettingsProps) {
	return (
		<div className="flex flex-col border-b p-5 pb-6 text-sm lg:border-b-0 lg:border-r lg:pb-5 lg:pr-7">
			<Label className="text-foreground">Set up your DNS Records:</Label>

			<p className="mb-4 mt-1 text-balance text-muted-foreground">
				First up, you will need to set up the DNS records in your domain
				configurations by creating a new entry with the details below. Please
				ensure the changes are saved and allow some time for them to propagate.
			</p>

			<div className="grid grid-cols-2 gap-4">
				<div className="relative space-y-1">
					<Label>Name:</Label>
					<Input
						defaultValue="_saas"
						className="pr-10"
						readOnly
						spellCheck="false"
					/>
					<Button
						type="button"
						size="iconInput"
						variant="ghost"
						title="Copy attribute"
						onClick={() => copyTextToClipboard('_saas')}
					>
						<IconCopy size={20} />
					</Button>
				</div>

				<div className="relative space-y-1">
					<Label>Type:</Label>
					<Input
						defaultValue="TXT"
						className="pr-10"
						readOnly
						spellCheck="false"
					/>
					<Button
						type="button"
						size="iconInput"
						variant="ghost"
						title="Copy attribute"
						onClick={() => copyTextToClipboard('TXT')}
					>
						<IconCopy size={20} />
					</Button>
				</div>

				<div className="relative col-span-2 space-y-1">
					<Label>Value:</Label>
					<Input
						defaultValue={`saas-domain-verification=${code}`}
						className="pr-10"
						readOnly
						spellCheck="false"
					/>
					<Button
						type="button"
						size="iconInput"
						variant="ghost"
						title="Copy attribute"
						onClick={() =>
							copyTextToClipboard(
								`saas-domain-verification=${code}`,
								'Verification Code',
							)
						}
					>
						<IconCopy size={20} />
					</Button>
				</div>
			</div>
		</div>
	)
}
