import { ClientOnly } from "@tanstack/react-router";

import { HyperText } from "@/components/ui/hyper-text";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { RippleButton } from "@/components/ui/ripple-button";
import { SectionHeading } from "@/components/ui/typography";
import { CONTACT_LIST } from "@/config/constants";
import { useMediaQuery } from "@/hooks/use-media-query";

import { ContactList } from "./contact-list";

export const ContactSection = () => {
	const isDesktop = useMediaQuery("(min-width: 768px)");

	return (
		<div className="flex h-full w-full items-center justify-center">
			<div className="flex w-full flex-col items-center">
				<SectionHeading
					title="Let's Build Something Together."
					subtitle="If you’re working on systems that require clarity, reliability, or real-time architecture - let’s talk."
				/>

				<div className="flex flex-col items-center gap-y-6">
					<div className="flex items-center justify-center gap-x-2 font-display tracking-[-0.06em]">
						<a href={CONTACT_LIST.get("Email")} target="_blank" rel="noopener">
							<RippleButton
								rippleColor="var(--b-primary)"
								className="h-14 w-38 border-[0.1px] border-foreground/20 bg-muted text-foreground shadow-sm transition-colors duration-400 hover:bg-muted/50"
							>
								<HyperText className="px-4 text-base font-semibold">
									Mail Me
								</HyperText>
							</RippleButton>
						</a>

						<a href="/resume.pdf" target="_blank" rel="noopener">
							<InteractiveHoverButton className="h-14 w-38 rounded-lg border-[0.1px] border-foreground/20 text-sm font-semibold shadow-sm">
								View Resume
							</InteractiveHoverButton>
						</a>
					</div>
				</div>

				<ClientOnly>
					{isDesktop && (
						<div className="mt-30 hidden w-full max-w-3xl items-center justify-between font-display font-bold tracking-[-0.06em] text-muted-foreground md:flex">
							<ContactList />
						</div>
					)}
				</ClientOnly>
			</div>
		</div>
	);
};
