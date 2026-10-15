export interface NavItem {
	label: string;
	url: string;
}

export interface NavlistProps {
	onClick: (event: React.MouseEvent<HTMLAnchorElement>, url: string) => void;
	activeNav: string;
	navItems: NavItem[];
}
