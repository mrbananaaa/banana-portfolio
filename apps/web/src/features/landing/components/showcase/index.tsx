import { SectionHeading } from "@/components/ui/typography";

export const ShowcaseSection = () => {
	return (
		<div className="flex h-full w-full items-center justify-center">
			<div className="flex w-full flex-col">
				<SectionHeading
					title="Selected Work"
					subtitle="Project that I've already done in the past"
				/>

				<div className="flex h-80 items-center justify-center rounded-xl bg-muted-foreground/20">
					<p className="font-display font-semibold tracking-[-0.06em] text-muted-foreground">
						Coming Soon
					</p>
				</div>
			</div>
		</div>
	);
};
