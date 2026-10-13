import { useGSAP } from "@gsap/react";
import { useNavigate } from "@tanstack/react-router";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

import { GridCell } from "@/components/ui/grid/grid-cell";
import { GridContainer } from "@/components/ui/grid/grid-container";
import { useScrollTo } from "@/hooks/use-scroll-to";

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
	const { scrollTo } = useScrollTo();
	const navigate = useNavigate();
	const containerRef = useRef(null);

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
			entries.forEach(async (entry) => {
				if (entry.isIntersecting) {
					const sectionID = entry.target.id === "hero" ? "" : entry.target.id;
					setActiveNav(`#${sectionID}`);

					await navigate({
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

	useGSAP(
		() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: containerRef.current,
					start: "top+=80 top",
					end: "top+=180 top",
					scrub: true,
				},
			});

			tl.from(".sliding-bg", {
				backgroundPosition: "100% 0%",
				duration: 1,
				color: "var(--b-foreground)",
				ease: "power1.out",
			}).from(
				".sliding-bg-primary",
				{
					backgroundPosition: "100% 0%",
					duration: 1,
					color: "var(--b-primary)",
					ease: "power1.out",
				},
				0,
			);
		},
		{ scope: containerRef },
	);

	return (
		<nav {...props}>
			<GridContainer>
				<GridCell className="px-0 py-7">
					<nav
						ref={containerRef}
						className="flex items-center justify-center md:justify-between"
					>
						<a href="/" onClick={(e) => navigateTo(e, "#")} className="block">
							<div className="flex flex-col items-start gap-y-0 text-left font-display text-xl leading-[80%] font-semibold tracking-[-0.06em] select-none md:text-2xl md:leading-[85%]">
								<h1 className="sliding-bg text-primary">mr.</h1>
								<h1 className="sliding-bg-primary text-foreground">bananaaa</h1>
							</div>
						</a>

						<ul className="hidden cursor-default gap-6 font-display text-base font-light tracking-tight text-muted-foreground md:flex">
							{NAV_LIST.map(({ label, url }) => (
								<li key={`${label}-${url}`}>
									<a
										href={`${url}`}
										onClick={(e) => navigateTo(e, url)}
										className={
											url === activeNav ? "bg-primary text-foreground" : ""
										}
									>
										{label}
									</a>
								</li>
							))}
						</ul>
					</nav>
				</GridCell>
			</GridContainer>
		</nav>
	);
};

export default LandingHeader;
