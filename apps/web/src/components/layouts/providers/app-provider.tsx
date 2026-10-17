import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(
	useGSAP,
	ScrollTrigger,
	ScrollSmoother,
	ScrollToPlugin,
	MorphSVGPlugin,
);

if (import.meta.env.DEV) {
	// Lazily load dev tools only in dev
	import("gsap/GSDevTools").then(({ GSDevTools }) => {
		gsap.registerPlugin(GSDevTools);
	});
}

interface AppProviderProps {
	children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
	return <>{children}</>;
};
