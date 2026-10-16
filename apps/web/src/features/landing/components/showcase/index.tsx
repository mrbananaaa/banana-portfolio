import { Carousel } from "@/components/ui/carousel";
import { SectionHeading } from "@/components/ui/typography";

import { showcase } from "./constants";
import { ShowcaseCard } from "./showcase-card";

export const ShowcaseSection = () => {
	return (
		<div className="flex h-full w-full items-center justify-center">
			<div className="flex w-full flex-col">
				<SectionHeading
					title="Selected Work"
					subtitle="Project that I've already done in the past"
				/>

				<div className="flex flex-col overflow-hidden">
					<div className="h-80 rounded-xl overflow-hidden p-2 border-[0.1px] border-foreground/20">
						<Carousel
							className="rounded-lg p-0.5"
							options={{ startSnap: 0, align: "center", dragFree: true }}
						>
							{showcase.map(({ title, desc, url }) => (
								<ShowcaseCard
									key={title}
									title={title}
									desc={desc}
									thumbnailUrl={url}
									className="carousel-item"
								/>
							))}

							{showcase.length <= 6 && (
								<div className="flex justify-center transition-colors duration-400 items-center rounded-lg bg-muted-foreground/20 gap-y-8 h-full p-2 cursor-default group hover:bg-muted-foreground/80 hover:shadow-sm hover:shadow-foreground/20 border-[0.1px] border-foreground/20 carousel-item w-67.5 selection:bg-primary selection:text-foreground">
									<div className="text-2xl text-center font-display font-semibold tracking-[-0.06em] leading-[85%] text-muted">
										<p>Coming</p>
										<p>Soon+</p>
									</div>
								</div>
							)}
						</Carousel>
					</div>
				</div>
			</div>
		</div>
	);
};
