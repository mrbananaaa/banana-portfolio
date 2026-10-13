import { cn } from "@/lib/utils";

import { Reveal } from "../animation/reveal";

interface SectionHeadingProps extends React.ComponentProps<"div"> {
	title: string;
	subtitle?: string;
}

export const SectionHeading = ({
	title,
	subtitle,
	className,
	...props
}: SectionHeadingProps) => {
	return (
		<div {...props}>
			<Reveal
				className={cn(
					"flex flex-col gap-y-1 text-center items-center mb-8 md:mb-10 lg:mb-14",
					className,
				)}
			>
				<h2 className="section-title">{title}</h2>
				{subtitle && (
					<p className="section-subtitle max-w-md text-center">{subtitle}</p>
				)}
			</Reveal>
		</div>
	);
};
