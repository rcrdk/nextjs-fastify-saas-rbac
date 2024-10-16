import { Role } from '@saas/auth'

export function getRoleName(role: Role) {
	switch (role) {
		case 'ADMIN':
			return 'Administrator'
		case 'BILLING':
			return 'Billing'
		case 'MEMBER':
			return 'Member'
		default:
			return 'Role informed'
	}
}
