import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const containerVariants = cva("", {
	variants: {
		space: {
			none: "gap-y-0",
			sm: "gap-y-4",
			md: "gap-y-6",
			lg: "gap-y-25",
		},
	},
	defaultVariants: {
		space: "md",
	},
});

interface GridContainerProps
	extends React.ComponentProps<"div">,
		VariantProps<typeof containerVariants> {
	children: React.ReactNode;
}

export const GridContainer = ({
	children,
	ref,
	className,
	space,
	...props
}: GridContainerProps) => {
	return (
		<div
			{...props}
			className={cn("mx-auto h-full w-full max-w-mgw px-4 md:px-8")}
			ref={ref}
		>
			<div
				className={cn(
					"grid h-full w-full grid-cols-4 gap-6 mx-auto sm:grid-cols-8 lg:grid-cols-12",
					containerVariants({ space }),
					className,
				)}
			>
				{children}
			</div>
		</div>
	);
};
