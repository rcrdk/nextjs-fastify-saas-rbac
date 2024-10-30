import { HTTPError } from 'ky'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { connectGoogle } from '@/http/account/providers/connect-google'
import { signInWithGoogle } from '@/http/auth/sign-in-with-google'
import { acceptInvite } from '@/http/invites/accept-invite'
import { errors } from '@/messages/error'
import { success } from '@/messages/success'

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams
	const code = searchParams.get('code')

	if (!code) {
		return NextResponse.json(
			{ message: 'GitHub OAuth code was not found' },
			{ status: 400 },
		)
	}

	const cookieStore = await cookies()

	const hasAuthUser = cookieStore.get('@SAAS:token')

	if (hasAuthUser) {
		try {
			await connectGoogle({ code })

			cookieStore.set(
				'@SAAS:providerConnected',
				success.ACCOUNT_CONNECTED_GOOGLE,
				{
					expires: new Date().getTime() + (60 * 1000) / 6, // 10s
				},
			)
		} catch (error) {
			if (error instanceof HTTPError) {
				const { message } = await error.response.json()

				cookieStore.set('@SAAS:providerError', message, {
					expires: new Date().getTime() + (60 * 1000) / 6, // 10s
				})
			} else {
				cookieStore.set('@SAAS:providerError', errors.app.UNEXPECTED, {
					expires: new Date().getTime() + (60 * 1000) / 6, // 10s
				})
			}
		}

		const redirectCurrentUser = request.nextUrl.clone()
		redirectCurrentUser.pathname = '/account/settings'
		redirectCurrentUser.search = ''

		return NextResponse.redirect(redirectCurrentUser)
	}

	const { token } = await signInWithGoogle({ code })

	cookieStore.set('@SAAS:token', token, {
		maxAge: 60 * 60 * 24 * 7, // 7d
		path: '/',
	})

	const inviteId = cookieStore.get('@SAAS:inviteId')?.value

	if (inviteId) {
		try {
			await acceptInvite({ inviteId })
			cookieStore.delete('@SAAS:inviteId')
		} catch {}
	}

	const redirectNewUser = request.nextUrl.clone()
	redirectNewUser.pathname = '/'
	redirectNewUser.search = ''

	return NextResponse.redirect(redirectNewUser)
}
