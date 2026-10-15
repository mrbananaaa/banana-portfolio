import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { GSDevTools } from "gsap/GSDevTools";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(
	useGSAP,
	GSDevTools,
	ScrollTrigger,
	ScrollSmoother,
	ScrollToPlugin,
	MorphSVGPlugin,
);

interface AppProviderProps {
	children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
	return <>{children}</>;
};
