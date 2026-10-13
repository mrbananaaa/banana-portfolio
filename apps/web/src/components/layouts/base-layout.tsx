import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { LandingAnimation } from "../ui/landing-animation";
import FooterSection from "./footer";
import LandingHeader from "./landing-header";
import { ScrollProvider } from "./providers/scroll-provider";

interface BaseLayoutProps extends React.ComponentProps<"div"> {
	children: React.ReactNode;
}

const BaseLayout = ({ children, className, ...props }: BaseLayoutProps) => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 80);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });

		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<>
			{isLoading && <LandingAnimation onFinish={() => setIsLoading(false)} />}

			<div
				{...props}
				className={cn(
					`${process.env.NODE_ENV !== "production" ? "debug-screens" : ""} relative flex min-h-screen w-full z-10 flex-col`,
					className,
				)}
			>
				<header
					className={`${isScrolled ? "shadow-sm/5" : ""} fixed top-0 z-60 w-full backdrop-blur-lg transition-all duration-1000`}
				>
					<LandingHeader />
				</header>

				<ScrollProvider>
					<div id="smooth-wrapper">
						<div id="smooth-content">
							<main className="relative flex-1 py-28">
								<div>{children}</div>
							</main>

							<footer className="w-full bg-foreground text-background">
								<FooterSection />
							</footer>
						</div>
					</div>
				</ScrollProvider>

				{/* <GridVisualizer /> */}
			</div>
		</>
	);
};

export default BaseLayout;
