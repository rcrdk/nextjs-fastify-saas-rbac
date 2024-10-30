'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import { deleteAccount } from '@/http/account/delete-account'
import { success } from '@/messages/success'

export async function deleteAccountAction() {
	const cookieStore = await cookies()

	await deleteAccount()

	cookieStore.set('@SAAS:deletedAccount', success.ACCOUNT_DELETED, {
		expires: new Date().getTime() + (60 * 1000) / 6, // 10s
	})

	redirect('/api/auth/sign-out')
}
