import {
	DeleteObjectCommand,
	DeleteObjectsCommand,
	PutObjectCommand,
	S3Client,
} from '@aws-sdk/client-s3'
import { env } from '@saas/env'

export const R2 = new S3Client({
	endpoint: env.AWS_ENDPOINT,
	region: env.AWS_REGION,
	credentials: {
		accessKeyId: env.AWS_ACCESS_KEY,
		secretAccessKey: env.AWS_SECRET_KEY,
	},
})

export async function putObjectR2(
	fileName: string,
	contentType: string,
	fileBuffer: Buffer,
) {
	await R2.send(
		new PutObjectCommand({
			Bucket: env.AWS_BUCKET,
			Key: fileName,
			ContentType: contentType,
			Body: fileBuffer,
		}),
	)
}

export async function deleteObjectR2(fileName: string) {
	await R2.send(
		new DeleteObjectCommand({
			Bucket: env.AWS_BUCKET,
			Key: fileName,
		}),
	)
}

export async function deleteMultipleObjectsR2(filenames: string[]) {
	if (filenames.length) {
		await R2.send(
			new DeleteObjectsCommand({
				Bucket: env.AWS_BUCKET,
				Delete: {
					Objects: filenames.map((fileName) => {
						return { Key: fileName }
					}),
				},
			}),
		)
	}
}
