import { ClientOnly, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import { GridCell } from "@/components/ui/grid/grid-cell";
import { GridContainer } from "@/components/ui/grid/grid-container";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useScrollTo } from "@/hooks/use-scroll-to";

import { MoboNav } from "./mobo-nav";
import { NavList } from "./nav-list";
import { DesktopLogo, MoboLogo } from "./nav-logo";

interface SiteHeaderProps extends React.ComponentProps<"nav"> {}

// TODO: Replace this with the data from cms
const NAV_LIST: {
	label: string;
	url: string;
}[] = [
	{
		label: "About",
		url: "#about",
	},
	{
		label: "Stack",
		url: "#stack",
	},
	{
		label: "Showcase",
		url: "#showcase",
	},
	{
		label: "Contact",
		url: "#contact",
	},
];

const removeHashPrefix = (target: string) => {
	if (target.startsWith("#")) {
		target = target.slice(1);
	}

	return target;
};

const LandingHeader = ({ ...props }: SiteHeaderProps) => {
	const [activeNav, setActiveNav] = useState("");
	const navigate = useNavigate();
	const { scrollTo } = useScrollTo();
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const navContainerRef = useRef(null);

	const navigateTo = async (
		e: React.MouseEvent<HTMLAnchorElement>,
		target: string = "#",
	) => {
		e.preventDefault();

		scrollTo(target);

		await navigate({
			hash: removeHashPrefix(target),
			hashScrollIntoView: false,
			replace: true,
			resetScroll: false,
		});
	};

	useEffect(() => {
		const observerCallback: IntersectionObserverCallback = (entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const sectionID = entry.target.id === "hero" ? "" : entry.target.id;

					// TODO: change to slide animation
					setActiveNav(`#${sectionID}`);

					navigate({
						hash: sectionID,
						hashScrollIntoView: false,
						replace: true,
						resetScroll: false,
					});
				}
			});
		};

		const observer = new IntersectionObserver(observerCallback, {
			rootMargin: "-50% 0px -50% 0px",
			root: null,
			threshold: 0,
		});

		const sections = document.querySelectorAll("[data-nav-section]");
		sections.forEach((section) => {
			observer.observe(section);
		});

		return () => observer.disconnect();
	}, [navigate]);

	return (
		<nav {...props}>
			<GridContainer>
				<GridCell className="px-0 py-7">
					<nav className="flex items-center justify-between">
						<a href="/" onClick={(e) => navigateTo(e, "#")} className="block">
							<ClientOnly>
								{isDesktop ? <DesktopLogo /> : <MoboLogo />}
							</ClientOnly>
						</a>

						<ClientOnly>
							{isDesktop ? (
								<ul
									ref={navContainerRef}
									className="hidden cursor-default gap-6 font-display text-base font-light tracking-tight text-muted-foreground md:flex"
								>
									<NavList
										navItems={NAV_LIST}
										activeNav={activeNav}
										onClick={(e, url) => navigateTo(e, url)}
									/>
								</ul>
							) : (
								<MoboNav
									nav={
										<NavList
											navItems={NAV_LIST}
											activeNav={activeNav}
											onClick={(e, url) => navigateTo(e, url)}
										/>
									}
								/>
							)}
						</ClientOnly>
					</nav>
				</GridCell>
			</GridContainer>
		</nav>
	);
};

export default LandingHeader;
