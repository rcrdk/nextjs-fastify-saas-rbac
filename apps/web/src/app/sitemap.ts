import { env } from '@saas/env'
import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: `${env.NEXT_PUBLIC_URL}/auth/sign-in`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1,
		},
		{
			url: `${env.NEXT_PUBLIC_URL}/auth/sign-in`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 1,
		},
	]
}
