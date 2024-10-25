import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	experimental: {
		serverActions: {
			bodySizeLimit: '10mb',
		},
	},
	images: {
		remotePatterns: [
			{ hostname: 'github.com' },
			{ hostname: 'avatars.githubusercontent.com' },
			{ hostname: 'gravatar.com' },
		],
	},
	async rewrites() {
		return [
			{
				source: '/sitemap.xml',
				destination: '/sitemap',
			},
		]
	},
	async redirects() {
		return [
			{
				source: '/auth',
				destination: '/auth/sign-in',
				permanent: true,
			},
		]
	},
}

export default nextConfig
