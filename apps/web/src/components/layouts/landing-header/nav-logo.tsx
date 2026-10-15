import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

import { Logo } from "@/components/ui/mrbananaaa-logo";

export const DesktopLogo = () => {
	const logoContainerRef = useRef(null);

	useGSAP(
		() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: logoContainerRef.current,
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
		{ scope: logoContainerRef },
	);

	return (
		<div
			ref={logoContainerRef}
			className="flex flex-col items-start gap-y-0 text-left font-display text-xl leading-[80%] font-semibold tracking-[-0.06em] select-none md:text-2xl md:leading-[85%]"
		>
			<h1 className="sliding-bg text-primary">mr.</h1>
			<h1 className="sliding-bg-primary text-foreground">bananaaa</h1>
		</div>
	);
};

export const MoboLogo = () => {
	return (
		<div className="size-10">
			<Logo />
		</div>
	);
};
