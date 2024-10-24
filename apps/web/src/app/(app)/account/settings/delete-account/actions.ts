'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { deleteAccount } from '@/http/delete-account'

export async function deleteAccountAction() {
	const cookieStore = await cookies()

	await deleteAccount()

	cookieStore.set('@SAAS:deletedAccount', 'Your account was deleted.', {
		// eslint-disable-next-line prettier/prettier
		expires: new Date().getTime() + ((60 * 1000) / 4), // 15s
	})

	redirect('/api/auth/sign-out')
}
