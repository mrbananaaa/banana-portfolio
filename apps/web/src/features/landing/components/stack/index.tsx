import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

import { Carousel } from "@/components/ui/carousel";
import { SectionHeading } from "@/components/ui/typography";

import { IconList, TechStackList } from "./techstack-list";

export const TechStackSection = () => {
	const containerRef = useRef(null);

	useGSAP(
		() => {
			const tl = gsap.timeline({
				scrollTrigger: {
					trigger: containerRef.current,
					toggleActions: "play reverse restart reverse",
					start: "top 70%",
				},
			});

			tl.from(".sliding-bg-primary", {
				backgroundPosition: "100% 0%",
				duration: 1.5,
				ease: "power1.out",
			});
		},
		{ scope: containerRef },
	);

	return (
		<div className="flex h-full w-full items-center justify-center">
			<div className="flex w-full flex-col">
				<SectionHeading
					title="Platform & Systems I Build on"
					subtitle="current tech stack that I worked with"
				/>

				<div className="flex flex-col gap-y-8 overflow-x-hidden">
					<div className="">
						<div className="h-80">
							<Carousel
								ref={containerRef}
								options={{ startSnap: 0, align: "center", dragFree: true }}
							>
								<TechStackList />
							</Carousel>
						</div>

						<span className="mt-2 box-content block text-center text-xs leading-[80%] tracking-[-0.06em] text-muted-foreground select-none">
							<span className="bg-muted">
								Hint: hover over the icon to show the name of the tech
							</span>
						</span>
					</div>

					<div className="flex h-14 w-full items-center justify-center">
						<Carousel
							options={{ startSnap: 0, align: "center", dragFree: true }}
							autoScrollOption={{
								enable: true,
								speed: 1,
								defaultInteraction: false,
							}}
						>
							<IconList />
						</Carousel>
					</div>
				</div>
			</div>
		</div>
	);
};
