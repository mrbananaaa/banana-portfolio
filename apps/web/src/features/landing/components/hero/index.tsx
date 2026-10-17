import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

import { Marquee } from "@/components/ui/marquee";
import { Logo } from "@/components/ui/mrbananaaa-logo";

const rows = [
	{
		id: crypto.randomUUID(),
		text: "Passionate Craftsmanship.",
		reverse: false,
	},
	{
		id: crypto.randomUUID(),
		text: "Where Beauty Meets Simplicity.",
		reverse: true,
	},
	{
		id: crypto.randomUUID(),
		text: "Passionate Craftsmanship.",
		reverse: false,
	},
	{
		id: crypto.randomUUID(),
		text: "Where Beauty Meets Simplicity.",
		reverse: true,
	},
] as const;

const MarqueeList = () => {
	return (
		<>
			{rows.map((row) => {
				return (
					<Marquee
						key={`top-${row.id}`}
						text={row.text}
						reverse={row.reverse}
						loops={2}
						copies={6} // ← bump for wide desktop if the edge opens up
					/>
				);
			})}
		</>
	);
};

const AnimatedLogo = () => {
	const containerRef = useRef(null);

	useGSAP(
		() => {
			const el = containerRef.current;
			if (!el) return;

			gsap.to(el, {
				rotation: 360,
				duration: 8,
				ease: "none",
				repeat: -1,
				transformOrigin: "center center",
			});
		},
		{ scope: containerRef },
	);

	return <Logo ref={containerRef} />;
};

export const HeroSection = () => {
	return (
		<div className="w-full rounded-2xl overflow-hidden shadow-sm p-2">
			<div className="h-[80svh] 2xl:h-[50svh] rounded-xl overflow-hidden w-full grid grid-cols-1 grid-rows-1">
				{/* BG */}
				<div className="relative z-10 col-start-1 row-start-1 h-full min-h-0 w-full min-w-0">
					<div className="absolute top-1">
						<MarqueeList />
					</div>

					<div className="absolute bottom-1">
						<MarqueeList />
					</div>
				</div>

				{/* <div className="z-15 col-start-1 row-start-1 h-full min-h-0 w-full min-w-0 overflow-hidden bg-foreground/20" /> */}

				{/* FG */}
				<div className="z-20 col-start-1 relative row-start-1 flex h-full w-full items-center justify-center overflow-hidden">
					<div className="inset-0 absolute place-self-center w-full">
						<div className="max-w-sm mx-auto overflow-hidden sm:max-w-lg md:max-w-3xl h-52 md:h-40 lg:h-52 flex items-center">
							<div className="border-[1.5px] border-primary rounded-full overflow-hidden p-3 flex justify-center items-center">
								<AnimatedLogo />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
