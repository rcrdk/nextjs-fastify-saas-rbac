import type { AbilityBuilder } from '@casl/ability'

import type { AppAbility } from '.'
import type { User } from './models/user'
import type { Role } from './roles'

type PermissionsByRole = (
	user: User,
	builder: AbilityBuilder<AppAbility>,
) => void

export const permissions: Record<Role, PermissionsByRole> = {
	ADMIN(user, { can, cannot }) {
		can('manage', 'all')

		cannot(['update', 'transfer_ownership'], 'Organization')
		can(['update', 'transfer_ownership'], 'Organization', {
			ownerId: { $eq: user.id },
		})
	},
	MEMBER(user, { can }) {
		can('get', 'User')
		can(['create', 'get'], 'Project')
		can(['update', 'delete'], 'Project', {
			ownerId: { $eq: user.id },
		})
	},
	BILLING(_, { can }) {
		can('get', 'User')
		can('get', 'Project')
		can('manage', 'Billing')
	},
}
