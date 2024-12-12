import type { AvatarReceipient } from '@/@types/avatar-receipient'
import { API } from '@/lib/api-client'

interface CreateInviteRequest {
	receipientId: string
	receipient: AvatarReceipient
	formData: FormData
}

type CreateInviteResponse = void

export async function updateAvatar({
	receipientId,
	receipient,
	formData,
}: CreateInviteRequest): Promise<CreateInviteResponse> {
	const lcReceipient = receipient.toLowerCase()

	await API.post(`upload/${lcReceipient}/${receipientId}`, {
		body: formData,
	})
}
