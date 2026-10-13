import { TECH_STACK } from "./constants";
import { technologies } from "./technologies";
import { type TechCategory } from "./types";

const TechIconList = ({ category }: { category: TechCategory }) => {
	const list = technologies.filter((t) => t.categories?.includes(category));

	return (
		<>
			{list.map(({ name, Icon, color, strokeColor }) => (
				<div
					key={name}
					style={{
						borderStyle: "solid",
						borderWidth: "0.1px",
						borderColor: `color-mix(in oklab, ${strokeColor ? strokeColor : ""} 30%, transparent)`,
					}}
					className="flex size-12 bg-muted cursor-pointer items-center justify-center rounded-lg shadow-md shadow-foreground/15"
				>
					<Icon
						color={color}
						style={{
							strokeWidth: "0.3px",
							stroke: `${strokeColor ? strokeColor : ""}`,
						}}
						className="size-8"
					/>
				</div>
			))}
		</>
	);
};

export const TechStackList = () => {
	return (
		<>
			{TECH_STACK.map(({ title, subtitle, category }) => (
				<div
					key={title}
					className="carousel-item h-full w-full rounded-xl border-[0.1px] border-foreground/20 bg-transparent p-4 md:w-1/2"
				>
					<div className="flex h-full flex-col justify-between">
						<div className="flex flex-col gap-y-1 md:max-w-3/4">
							<h3 className="sliding-bg-primary w-fit font-display text-2xl font-semibold tracking-[-0.06em]">
								{title}
							</h3>

							<span className="text-sm font-medium tracking-[-0.06em] text-muted-foreground/90">
								{subtitle}
							</span>
						</div>

						<div className="flex h-[65%] overflow-hidden">
							<div className="grid h-full w-full grid-cols-[repeat(auto-fill,minmax(48px,1fr))] content-start items-start gap-2 overflow-y-scroll p-1 md:max-w-md">
								<TechIconList category={category} />
							</div>
						</div>
					</div>
				</div>
			))}
		</>
	);
};
