import { createFileRoute } from "@tanstack/react-router";

import BaseLayout from "@/components/layouts/base-layout";
import { GridCell } from "@/components/ui/grid/grid-cell";
import { GridContainer } from "@/components/ui/grid/grid-container";
import { AboutSection } from "@/features/landing/components/about";
import { ContactSection } from "@/features/landing/components/contact";
import { HeroSection } from "@/features/landing/components/hero";
import { ShowcaseSection } from "@/features/landing/components/showcase";
import { TechStackSection } from "@/features/landing/components/stack";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<BaseLayout>
			<GridContainer space="lg" className="flex min-h-300 flex-col">
				<GridCell id="hero" className="h-[80svh] max-h-none" data-nav-section>
					<HeroSection />
				</GridCell>

				<GridCell
					offset="both"
					id="about"
					className="min-h-[80svh]"
					data-nav-section
				>
					<AboutSection />
				</GridCell>

				<GridCell
					offset="both"
					id="stack"
					className="h-[80svh] overflow-visible"
					data-nav-section
				>
					<TechStackSection />
				</GridCell>

				<GridCell
					offset="both"
					id="showcase"
					className="h-[80svh]"
					data-nav-section
				>
					<ShowcaseSection />
				</GridCell>

				<GridCell
					offset="both"
					id="contact"
					className="h-[80svh]"
					data-nav-section
				>
					<ContactSection />
				</GridCell>
			</GridContainer>
		</BaseLayout>
	);
}
