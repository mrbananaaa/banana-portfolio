import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { memo, useRef } from "react";

import { cn } from "@/lib/utils";

interface MarqueeProps {
	text: string;
	reverse?: boolean;
	/**
	 * How many copy-widths the track travels across the scroll range.
	 * Higher = faster scroll-linked movement. Requires copies > loops + 1.
	 */
	loops?: number;
	/**
	 * Number of text copies in the track.
	 * Constraint: copies > loops + 1, or you'll see a gap on the right edge.
	 */
	copies?: number;
	/**
	 * Scrub smoothing in seconds. `true` = 1:1 with scroll (recommended
	 * since ScrollSmoother already smooths). `0.3` = extra lag.
	 */
	scrub?: number | boolean;
	className?: string;
}

const Marquee = memo(function Marquee({
	text,
	reverse = false,
	loops = 3,
	copies = 5,
	scrub = true,
	className,
}: MarqueeProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const trackRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const container = containerRef.current;
			const track = trackRef.current;
			if (!container || !track) return;

			if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

			const step = 100 / copies;
			const total = step * loops;

			gsap.fromTo(
				track,
				{ xPercent: reverse ? -total : 0 },
				{
					xPercent: reverse ? 0 : -total,
					ease: "none",
					scrollTrigger: {
						trigger: container,
						start: "top bottom",
						end: "bottom top",
						scrub,
						invalidateOnRefresh: true,
					},
				},
			);
		},
		{
			scope: containerRef,
			dependencies: [reverse, loops, copies, scrub],
		},
	);

	let childCount = 0;

	return (
		<div
			ref={containerRef}
			aria-hidden="true"
			className={cn(
				"flex w-full overflow-hidden whitespace-nowrap select-none",
				className,
			)}
		>
			<div ref={trackRef} className="flex shrink-0 gap-x-5">
				{Array.from({ length: copies }, () => {
					const currentID = childCount;
					childCount++;
					return <MarqueeText key={currentID} text={text} />;
				})}
			</div>
		</div>
	);
});

const MarqueeText = memo(function MarqueeText({ text }: { text: string }) {
	let childCount = 0;

	return (
		<div className="flex items-end gap-x-2">
			{text.split(" ").map((word, i) => {
				const currentID = childCount;
				childCount++;

				return (
					<span
						key={currentID}
						className={cn(
							"-mb-1",
							i % 2 === 0 ? "marque-stroke-text" : "marque-solid-text",
						)}
					>
						{word}
					</span>
				);
			})}
		</div>
	);
});

export { Marquee };
