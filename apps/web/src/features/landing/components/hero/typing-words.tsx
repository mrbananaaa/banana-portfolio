import { LazyMotion, domAnimation } from "motion/react";

import { TypingAnimation } from "@/components/ui/typing-animation";

export const TypingWords = () => {
	return (
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
	);
};
