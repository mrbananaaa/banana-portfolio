import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

import { cn } from "@/lib/utils";

interface RevealProps extends React.ComponentPropsWithRef<"div"> {
	children: React.ReactNode;
}

export const Reveal = ({ children, className, ...props }: RevealProps) => {
	const container = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const elements = container.current?.children;

			if (!elements) return;

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: container.current,
					start: "top 70%",
					toggleActions: "play reverse play reverse",
				},
			});

			tl.from(elements, {
				y: 30,
				opacity: 0,
				duration: 0.9,
				ease: "power3.out",
				stagger: 0.5,
			});
		},
		{ scope: container },
	);

	return (
		<div {...props} className={cn("", className)} ref={container}>
			{children}
		</div>
	);
};
