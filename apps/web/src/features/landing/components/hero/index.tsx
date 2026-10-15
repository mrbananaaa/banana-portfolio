import { LazyMotion, domAnimation } from "motion/react";

import { TypingAnimation } from "@/components/ui/typing-animation";

export const HeroSection = () => {
	return (
		<div className="flex h-full w-full items-center justify-start">
			<div className="flex flex-col gap-y-6">
				<div className="max-w-sm overflow-hidden sm:max-w-lg md:max-w-3xl lg:h-60">
					<LazyMotion features={domAnimation} strict>
						<TypingAnimation
							// INFO: Match the typing start delay with landing animation end
							startOnView={false}
							className="font-display text-5xl leading-[100%] font-bold tracking-[-0.055em] selection:bg-primary sm:text-6xl md:text-7xl lg:text-8xl "
							words={[
								<span key={"2124"}>Passionate Craftsmanship</span>,
								<span key={"2132"}>
									Where <span className="bg-primary">Beauty</span>{" "}
									<span className="bg-primary">Meets</span> Simplicity.
								</span>,
							]}
							typeSpeed={120}
							pauseDelay={1000}
							loop
						/>
					</LazyMotion>
				</div>

				<div className="text-xs font-light text-muted-foreground italic selection:bg-primary sm:text-sm md:text-xl">
					~{" "}
					<span className="text-primary selection:text-foreground">
						mr.bananaaa
					</span>{" "}
					with a couple of ChatGPT prompt.
				</div>
			</div>
		</div>
	);
};
