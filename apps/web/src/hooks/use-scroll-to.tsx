import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const useScrollTo = () => {
	const { contextSafe } = useGSAP();

	const scrollTo = contextSafe((target: string) => {
		gsap.to(window, {
			duration: 0.2,
			ease: "none",
			scrollTo: {
				y: target === "#" ? 0 : target,
				offsetY: 120,
			},
		});
	});

	return {
		scrollTo,
	};
};
