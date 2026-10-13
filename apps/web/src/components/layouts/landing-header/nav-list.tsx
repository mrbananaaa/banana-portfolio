import { useNavigate } from "@tanstack/react-router";

import { useScrollTo } from "@/hooks/use-scroll-to";

interface NavItem {
	label: string;
	url: string;
}

interface NavlistProps {
	navItems: NavItem[];
}

export const NavList = ({ navItems }: NavlistProps) => {
	const { scrollTo } = useScrollTo();
	const navigate = useNavigate();

	if (navItems.length < 1) return null;

	const removeHashPrefix = (target: string) => {
		if (target.startsWith("#")) {
			target = target.slice(1);
		}

		return target;
	};

	const navigateTo = async (
		e: React.MouseEvent<HTMLAnchorElement>,
		target: string = "#",
	) => {
		scrollTo(target);
		e.preventDefault();

		await navigate({
			hash: removeHashPrefix(target),
			hashScrollIntoView: false,
			ignoreBlocker: true,
		});
	};

	return (
		<>
			{navItems.map(({ label, url }) => (
				<li key={`${label}-${url}`}>
					<a href={url} onClick={(e) => navigateTo(e, url)}>
						{label}
					</a>
				</li>
			))}
		</>
	);
};
