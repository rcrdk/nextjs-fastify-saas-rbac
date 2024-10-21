import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

import { acceptInvite } from '@/http/accept-invite'
import { signInWithGithub } from '@/http/sign-in-with-github'

export async function GET(request: NextRequest) {
	const searchParams = request.nextUrl.searchParams
	const code = searchParams.get('code')

	const cookieStore = await cookies()

	if (!code) {
		return NextResponse.json(
			{ message: 'GitHub OAuth code was not found.' },
			{ status: 400 },
		)
	}

	const { token } = await signInWithGithub({ code })

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

	const redirectURL = request.nextUrl.clone()
	redirectURL.pathname = '/'
	redirectURL.search = ''

	return NextResponse.redirect(redirectURL)
}
