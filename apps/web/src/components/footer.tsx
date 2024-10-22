import { IconBrandGithub, IconBrandLinkedin } from '@tabler/icons-react'

export function Footer() {
	return (
		<footer className="mx-auto w-full max-w-[1200px] border-t pt-4">
			<div className="flex items-center justify-between text-xs text-muted-foreground">
				<p>
					<a
						href="https://github.com/rcrdk/nextjs-fastify-saas-rbac"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:underline"
						title="Project repository on GitHub"
					>
						Next.js + RBAC
					</a>{' '}
					| {new Date().getFullYear()}
				</p>

				<div className="flex items-center gap-2">
					<a
						href="https://rcrdk.dev"
						target="_blank"
						rel="noopener noreferrer"
						className="hover:underline"
					>
						rcrdk.dev
					</a>
					|
					<a
						href="https://github.com/rcrdk"
						target="_blank"
						rel="noopener noreferrer"
						className="transition-colors hover:text-foreground"
						title="GitHub Profile"
					>
						<IconBrandGithub size={20} />
					</a>
					<a
						href="https://linkedin.com/in/rcrdk"
						target="_blank"
						rel="noopener noreferrer"
						className="transition-colors hover:text-foreground"
						title="LinkedIn Profile"
					>
						<IconBrandLinkedin size={20} />
					</a>
				</div>
			</div>
		</footer>
	)
}
