import { useGSAP } from "@gsap/react";
import { cn } from "cn";
import gsap from "gsap";
import type React from "react";
import { useRef } from "react";

import myAvatar from "@/assets/mrbananaaa-avatar-brown.webp?url";

interface MyAvatarProps extends React.ComponentProps<"div"> {}

export const MyAvatar = ({ className, ...props }: MyAvatarProps) => {
	const containerRef = useRef(null);

	useGSAP(
		() => {
			gsap.from("#img-reveal", {
				autoAlpha: 0,
				duration: 0.6,
				width: "95%",
				height: "95%",
				ease: "bounce.inOut",
				scrollTrigger: {
					trigger: containerRef.current,
					toggleActions: "play reverse restart reverse",
					start: "top 90%",
					markers: false,
				},
			});
		},
		{ scope: containerRef },
	);

	return (
		<div {...props} className={cn("", className)} ref={containerRef}>
			<img
				id="img-reveal"
				src={myAvatar}
				alt="mrbananaaa avatar"
				className="object-cover select-none"
			/>
		</div>
	);
};
