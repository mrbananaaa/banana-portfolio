/*
 * Scroll Provider - Save last scroll position in local storage and
 * scroll to last position on page load using gsap scroll smoother
 * */

import { useGSAP } from "@gsap/react";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useRef } from "react";

interface ScrollProviderProps {
	children: React.ReactNode;
}

export const ScrollProvider = ({ children }: ScrollProviderProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const smoother = useRef<ScrollSmoother | null>(null);

	useGSAP(
		() => {
			smoother.current = ScrollSmoother.create({
				wrapper: "#smooth-wrapper",
				content: "#smooth-content",
				smooth: 1.2,
				effects: true,
			});

			return () => {
				smoother.current?.kill();
				smoother.current = null;
			};
		},
		{ scope: containerRef },
	);

	return <div ref={containerRef}>{children}</div>;
};
