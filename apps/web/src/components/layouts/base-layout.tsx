import { useCallback, useState } from "react";

import { useScrolled } from "@/hooks/use-scrolled";
import { cn } from "@/lib/utils";

import { LandingAnimation } from "../ui/landing-animation";
import FooterSection from "./footer";
import LandingHeader from "./landing-header";
import { ScrollProvider } from "./providers/scroll-provider";

interface BaseLayoutProps extends React.ComponentProps<"div"> {
	children: React.ReactNode;
}

const IS_DEV = import.meta.env.DEV;

const StickyHeader = () => {
	const isScrolled = useScrolled(80);

	return (
		<header
			className={cn(
				"fixed top-0 z-60 w-full transition-[box-shadow,backdrop-filter] duration-300",
				isScrolled
					? "bg-background/70 backdrop-blur-lg shadow-sm"
					: "bg-transparent backdrop-blur-none",
			)}
		>
			<LandingHeader />
		</header>
	);
};

const BaseLayout = ({ children, className, ...props }: BaseLayoutProps) => {
	const [isLoading, setIsLoading] = useState(true);
	const handleAnimationFinish = useCallback(() => setIsLoading(false), []);

	return (
		<>
			{isLoading && <LandingAnimation onFinish={handleAnimationFinish} />}

			<div
				{...props}
				className={cn(
					`${IS_DEV ? "debug-screens" : ""} relative flex min-h-dvh w-full z-10 flex-col`,
					className,
				)}
			>
				<StickyHeader />

				<ScrollProvider>
					<div id="smooth-wrapper">
						<div id="smooth-content">
							<main className="relative flex-1 py-28">{children}</main>

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
