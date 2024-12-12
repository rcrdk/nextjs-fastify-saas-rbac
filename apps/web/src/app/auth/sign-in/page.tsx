import type { Metadata } from 'next'
import { cookies } from 'next/headers'

import { SignInForm } from './form'

export const metadata: Metadata = {
	title: 'Sign In',
}

export default async function SignInPage() {
	const cookieStore = await cookies()

	const deletedAccountMessage = cookieStore.get('@SAAS:deletedAccount')?.value

	return <SignInForm accountDeleted={deletedAccountMessage} />
}
