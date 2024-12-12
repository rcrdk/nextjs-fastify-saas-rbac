/* eslint-disable prettier/prettier */
'use server'

import { env } from '@saas/env'
import { HTTPError } from 'ky'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

import type { AccountProviders } from '@/@types/account-providers'
import { removeAccountProvider } from '@/http/account/remove-account-provider'
import { errors } from '@/messages/error'
import { success } from '@/messages/success'

export async function disconnectAction(provider: AccountProviders) {
	try {
		await removeAccountProvider({ provider })

		revalidateTag('get-profile')
	} catch (error) {
		if (error instanceof HTTPError) {
			const { message } = await error.response.json()
			return { success: false, message, errors: null }
		}

		console.error(error)

		return {
			success: false,
			message: errors.app.UNEXPECTED,
			errors: null,
		}
	}

	return {
		success: true,
		message: success.ACCOUNT_REMOVED_PROVIDER,
		errors: null,
	}
}

export async function authorizeGithubAction() {
	const githubSignInUrl = new URL('login/oauth/authorize', 'http://github.com')

	githubSignInUrl.searchParams.set('client_id', env.GITHUB_OAUTH_CLIENT_ID)
	githubSignInUrl.searchParams.set('scope', 'user')
	githubSignInUrl.searchParams.set('redirect_uri', env.GITHUB_OAUTH_CLIENT_REDIRECT_URI)

	redirect(githubSignInUrl.toString())
}

export async function authorizeGoogleAction() {
	const googleSignInUrl = new URL('o/oauth2/v2/auth', 'https://accounts.google.com')

	googleSignInUrl.searchParams.set('client_id', env.GOOGLE_OAUTH_CLIENT_ID)
	googleSignInUrl.searchParams.set('redirect_uri', env.GOOGLE_OAUTH_CLIENT_REDIRECT_URI)
	googleSignInUrl.searchParams.set('response_type', env.GOOGLE_OAUTH_CLIENT_RESPONSE_TYPE)
	googleSignInUrl.searchParams.set('scope', env.GOOGLE_OAUTH_CLIENT_SCOPE)
	googleSignInUrl.searchParams.set('prompt', 'consent')
	googleSignInUrl.searchParams.set('access_type', 'offline')

	redirect(googleSignInUrl.toString())
}