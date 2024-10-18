import { Header } from '@/components/header'

export default async function Home() {
	return (
		<div className="flex min-h-screen flex-col px-5 py-4 md:px-8">
			<Header />

			<main className="mx-auto flex w-full max-w-[1200px] flex-grow items-center py-6 sm:py-8">
				<div className="w-full space-y-4">
					<h1 className="text-center text-2xl font-bold">
						Select an organization
					</h1>
				</div>
			</main>
		</div>
	)
}
