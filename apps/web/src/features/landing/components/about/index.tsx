import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { useRef } from "react";

import { MyAvatar } from "./mrbananaaaa-avatar";

export const AboutSection = () => {
	const containerRef = useRef(null);
	const titleRef = useRef(null);
	const paragraphRef = useRef(null);

	useGSAP(
		() => {
			if (!titleRef.current && !paragraphRef.current) return;

			const titleSplit = SplitText.create(titleRef.current, {
				type: "words",
			});
			const paragraphSplit = SplitText.create(paragraphRef.current, {
				type: "words",
			});

			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: containerRef.current,
					start: "top 60%",
					end: "bottom 30%",
					scrub: 1,
					markers: false,
				},
			});

			tl.from(titleSplit.words, {
				opacity: 0.15,
				stagger: 0.1,
			})
				.from(
					".sliding-bg-primary",
					{
						backgroundPosition: "100% 0%",
						duration: 1,
						ease: "power2.out",
						stagger: 0.5,
					},
					0,
				)
				.from(
					paragraphSplit.words,
					{
						opacity: 0.5,
						stagger: 0.1,
					},
					0,
				);

			return () => {
				titleSplit.revert();
			};
		},
		{ scope: containerRef },
	);

	return (
		<div ref={containerRef} className="flex h-full w-full items-center">
			<div className="flex w-full flex-col items-center gap-y-8 md:flex-row md:gap-x-10 md:gap-y-0 lg:justify-between xl:justify-center xl:gap-x-14">
				<div className="flex-1 md:max-w-lg">
					<MyAvatar className="h-full w-full" />
				</div>

				<div className="flex max-w-lg flex-col space-y-2 md:space-y-4">
					<div
						ref={titleRef}
						className="z-10 font-display text-2xl leading-[120%] font-semibold tracking-[-0.03em] selection:bg-primary md:text-3xl lg:text-4xl"
					>
						Hey, I'm {/* Added ! after the selection colors */}
						<span className="sliding-bg-primary selection:bg-foreground! selection:text-primary!">
							Devyan
						</span>{" "}
						— a{" "}
						<span className="sliding-bg-primary selection:bg-foreground! selection:text-primary!">
							self-taught
						</span>{" "}
						Full-Stack Engineer who started{" "}
						<span className="sliding-bg-primary selection:bg-foreground! selection:text-primary!">
							building software out of curiosity
						</span>{" "}
						and gradually turned it into my craft.
					</div>

					<div
						ref={paragraphRef}
						className="text-sm leading-tight tracking-[-0.06em] text-muted-foreground selection:bg-primary selection:text-foreground md:text-base"
					>
						I work across the stack, with a focus on systems, data, and scalable
						software. I enjoy designing clean APIs, working closely with
						databases, and building predictable data flows from end to end.
					</div>
				</div>
			</div>
		</div>
	);
};
