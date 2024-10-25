import { S3Client } from '@aws-sdk/client-s3'
import { env } from '@saas/env'

export const R2 = new S3Client({
	endpoint: env.AWS_ENDPOINT,
	region: env.AWS_REGION,
	credentials: {
		accessKeyId: env.AWS_ACCESS_KEY,
		secretAccessKey: env.AWS_SECRET_KEY,
	},
})
