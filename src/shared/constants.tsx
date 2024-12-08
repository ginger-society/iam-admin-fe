export const APP_ID = 'iam-admin-staging'
export const APP_NAME = 'IAM Admin'
export const ORG_NAME = 'Ginger Society'
export const APP_ICON = "https://www.gingersociety.org/img/ginger-dev-portal-icon.png";

export const sideMenuOptions = [
	{ id: 'users', label: <span>Users</span> },
	{ id: 'apps', label: <span>Apps</span> },
	{ id: 'groups', label: <span>Groups</span> },
]

export const idPathMap: { [key: string]: string } = {
	users: '/users',
	groups: '/manage-group',
	apps: '/apps'
}

export const pathIdMap = Object.fromEntries(
	Object.entries(idPathMap).map(([key, value]) => [value, key])
);