export function getUploadedAvatarNames(avatars: string[]) {
	const validAvatars = avatars
		.filter((avatar) => avatar.startsWith('{AWS}/'))
		.map((avatar) => {
			return avatar.replace('{AWS}/', '')
		})

	return validAvatars
}
