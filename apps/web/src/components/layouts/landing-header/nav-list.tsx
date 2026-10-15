import { type NavlistProps } from "./types";

export const NavList = ({ navItems, activeNav, onClick }: NavlistProps) => {
	return (
		<>
			{navItems.map(({ label, url }) => (
				<li key={`${label}-${url}`}>
					<a
						href={`${url}`}
						onClick={(e) => {
							onClick(e, url);
						}}
						className={`${url === activeNav ? "bg-primary text-foreground" : ""} transition-all duration-700`}
					>
						{label}
					</a>
				</li>
			))}
		</>
	);
};
