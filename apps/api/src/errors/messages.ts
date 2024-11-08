/* eslint-disable prettier/prettier */
export const errors = {
	api: {
		VALIDATION_ERROR: 'Validation error',
		SERVER_ERROR: 'Internal server error',
	},
	services: {
		SEND_EMAIL: 'An error occurred while trying to send the e-mail',
		GITHUB_ALREADY_CONNECTED: 'You already have a GitHub account connected',
		GITHUB_ALREADY_CONNECTED_SOMEONE_ELSE: 'This Github account is already connected with another account',
		GOOGLE_ALREADY_CONNECTED: 'You already have a Google account connected',
		GOOGLE_ALREADY_CONNECTED_SOMEONE_ELSE: 'This Google account is already connected with another account',
	},
	user: {
		ALREADY_EXISTS: 'An user with same e-mail already exists',
		NOT_FOUND: 'User not found',
		ACCOUNT_NOT_FOUND: 'Account not found',
		EMAIL_VALIDATION_NOT_FOUND: 'E-mail change validation not found',
		EMAIL_VALIDATION_EXPIRED: 'E-mail change validation does not exists or already expired',
		EMAIL_VALIDATION_INVALID: 'Invalid validation code'
	},
	auth: {
		NOT_PASSWORD_FOUND: 'User does not have a password, use social sign-in',
		INVALID_CREDENTIALS: 'Invalid credentials',
		INVALID_TOKEN: 'Invalid authentication token',
		INVALID_EMAIL_TOKEN: 'The token provied is not valid. Note: The code is valid for 5 minutes',
		INVALID_PASSWORD_TOKEN: 'Unable to reset password. Ensure your recovery code is valid and try again. Note: The code is valid for 5 minutes',
		LAST_METHOD_AVAILABLE: 'This service is the only access method available. Set a password or connect with another provider first',
		GITHUB_EMAIL_NOT_FOUND: 'Your GitHub account does not have an e-mail to authenticate',
		PASSWORD_NUMBER: 'Enter one number.',
		PASSWORD_UPPER: 'Enter one upper case letter.',
		PASSWORD_LOWER: 'Enter one lower case letter.',
		PASSWORD_SPECIAL: 'Enter one special character.',
		PASSWORD_LENGTH: 'Enter at least 6 characters.',
	},
	organizations: {
		entity: {
			NOT_FOUND: 'Organization not found',
			NOT_MEMBER: 'The user is not a member of this organization',
			ALREADY_EXISTS: 'There is another organization using the same name. Choose a different one',
			CANNOT_SHUTDOWN: 'You are not allowed to shutdown this organization',
			CANNOT_TRANSFER: 'You are not allowed to transfer ownership of this organization',
			CANNOT_UPDATE: 'You are not allowed to update this organization',
			CANNOT_LEAVE: 'You are the owner of this organization, to leave it you must transfer the ownership first',
		},
		billing: {
			CANNOT_LIST: 'You are not allowed to get billing details from this organization',
		},
		domain: {
			ALREADY_EXISTS: 'Another organization with same domain already exists',
			CHECK_DNS: 'Error checking DNS information',
			TXT_NOT_FOUND: 'A valid TXT record was not found in the DNS records',
			TXT_INVALID: 'A valid TXT record was found, but does not match in the DNS records. Check your DNS values.',
		},
		members: {
			CANNOT_ACCESS: 'You are not a member of this organization',
			CANNOT_LIST: 'You are not allowed to list organization members',
			CANNOT_DELETE: 'You are not allowed to remove this organization member',
			CANNOT_UPDATE: 'You are not allowed to update this organization member',
		},
		invites: {
			NOT_FOUND: 'Invite not found or expired',
			NOT_ALLOWED: 'This invite belongs to another user',
			AUTOJOIN_DOMAIN: 'Users with {domain} domain will join your organization automatically on sign in',
			ALREADY_EXISTS: 'Another invite with same e-mail already exists',
			ALREADY_MEMBER: 'A member with this e-mail already belongs to your organization',
			CANNOT_SEND: 'You are not allowed to create a new invite',
			CANNOT_LIST: 'You are not allowed to get organization invites',
			CANNOT_REVOKE: 'You are not allowed to revoke an invite',
		},
	},
	projects: {
		NOT_FOUND: 'Project not found',
		ALREADY_EXISTS: 'There is another project in this organization using the same project name. Choose a different one',
		CANNOT_LIST: 'You are not allowed to list projects',
		CANNOT_GET: 'You are not allowed to get a project',
		CANNOT_CREATE: 'You are not allowed to create a new project',
		CANNOT_UPDATE: 'You are not allowed to update this project',
		CANNOT_DELETE: 'You are not allowed to remove this project',
	},
	files: {
		NOT_FOUND: 'Select a file to update',
		MAX_SIZE: 'Your avatar must have less than 2mb',
		PROCESSING: 'An unexpected error occurred while processing your file', 
		FORMAT: 'The file selected is not a valid image',
		UPLOAD: 'An unexpected error occurred during file upload',
		DELETE: 'An unexpected error occurred during file removal',
	}
}
