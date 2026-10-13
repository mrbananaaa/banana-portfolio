import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

interface LandingAnimationProps {
	onFinish: () => void;
}

export const LandingAnimation = ({ onFinish }: LandingAnimationProps) => {
	const containerRef = useRef(null);

	useGSAP(
		() => {
			const tl = gsap.timeline();

			tl.to("#main-box", {
				width: 200,
				height: 200,
				borderRadius: "50%",
				duration: 0.8,
				ease: "power4.inOut",
			})
				.to("#main-box", {
					duration: 0.4,
					ease: "power4.inOut",
					backgroundImage: "url('/logo-light.svg')",
					backgroundPosition: "center",
					backgroundRepeat: "no-repeat",
					backgroundSize: "cover",
				})
				.to("#main-box", {
					width: 300,
					height: 300,
					duration: 0.2,
					ease: "bounce",
					backgroundImage: "url('/logo-dark.svg')",
				})
				.to("#main-box", {
					delay: 0.8,
					width: 200,
					height: 200,
					duration: 0.4,
					ease: "bounce",
				})
				.to("#main-box", {
					delay: 0.4,
					width: 0,
					height: 0,
					duration: 0.2,
					onComplete: () => {
						setTimeout(onFinish, 200);
					},
				})
				.to(containerRef.current, {
					autoAlpha: 0,
					width: 0,
					height: 0,
					display: "none",
					duration: 0.8,
					ease: "power3.out",
				});
		},
		{ scope: containerRef },
	);

	return (
		<div ref={containerRef} className="fixed inset-0 z-100 bg-background">
			<div className="flex h-svh w-svw items-center justify-center">
				<div id="main-box" className="h-full w-full bg-primary"></div>
			</div>
		</div>
	);
};
