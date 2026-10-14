import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

// Types for our responsive breakdown mapping
export type GridSpan = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface ResponsiveSpan {
	base?: GridSpan; // Mobile / Default
	sm?: GridSpan; // Tablet
	lg?: GridSpan; // Desktop
}

// CVA configurations for responsive utility lookups
const baseSpanVariants = cva("", {
	variants: {
		span: {
			1: "col-span-1",
			2: "col-span-2",
			3: "col-span-3",
			4: "col-span-4",
			5: "col-span-5",
			6: "col-span-6",
			7: "col-span-7",
			8: "col-span-8",
			9: "col-span-9",
			10: "col-span-10",
			11: "col-span-11",
			12: "col-span-12",
		},
	},
});

const smSpanVariants = cva("", {
	variants: {
		span: {
			1: "sm:col-span-1",
			2: "sm:col-span-2",
			3: "sm:col-span-3",
			4: "sm:col-span-4",
			5: "sm:col-span-5",
			6: "sm:col-span-6",
			7: "sm:col-span-7",
			8: "sm:col-span-8",
			9: "sm:col-span-9",
			10: "sm:col-span-10",
			11: "sm:col-span-11",
			12: "sm:col-span-12",
		},
	},
});

const lgSpanVariants = cva("", {
	variants: {
		span: {
			1: "lg:col-span-1",
			2: "lg:col-span-2",
			3: "lg:col-span-3",
			4: "lg:col-span-4",
			5: "lg:col-span-5",
			6: "lg:col-span-6",
			7: "lg:col-span-7",
			8: "lg:col-span-8",
			9: "lg:col-span-9",
			10: "lg:col-span-10",
			11: "lg:col-span-11",
			12: "lg:col-span-12",
		},
	},
});

const layoutOffsetVariants = cva("", {
	variants: {
		offset: {
			none: "",
			// Pulls content out past the LEFT margin track boundary
			left: "lg:-ml-grid-outside",
			// Pulls content out past the RIGHT margin track boundary
			right: "lg:-mr-grid-outside",
			// FULL BLEED: Stretches the cell fully out to BOTH browser screen edges
			// both: "lg:-mx-grid-outside lg:px-grid-outside",
			both: "col-span-4 sm:col-span-8 lg:col-span-12 lg:-mx-grid-outside",
		},
	},
	defaultVariants: {
		offset: "none",
	},
});

interface GridCellProps
	extends React.ComponentProps<"div">,
		VariantProps<typeof layoutOffsetVariants> {
	children?: React.ReactNode;
	span?: GridSpan | ResponsiveSpan;
}

export const GridCell = ({
	children,
	ref,
	className,
	span = 12, // default fallback
	offset,
	...props
}: GridCellProps) => {
	// Parse the span input to generate standard responsive Tailwind class variations
	const getSpanClasses = () => {
		if (offset === "both") return "";

		if (typeof span === "number") {
			return cn(
				"col-span-4",
				smSpanVariants({ span: span > 8 ? 8 : span }),
				lgSpanVariants({ span }),
			);
		}

		return cn(
			baseSpanVariants({ span: span.base }),
			span.sm && smSpanVariants({ span: span.sm }),
			span.lg && lgSpanVariants({ span: span.lg }),
		);
	};

	const isFullBleed = offset === "both";

	return (
		<div
			{...props}
			className={cn(
				getSpanClasses(),
				layoutOffsetVariants({ offset }),
				isFullBleed ? null : className,
			)}
			ref={ref}
		>
			{isFullBleed ? (
				/* AUTOMATED INNER CONTENT LAYER: Snaps inside children elements to line up perfectly with the grid */
				/* <div className="mx-auto w-full max-w-mgw px-4 md:px-8">{children}</div> */
				/* <div className={cn("mx-auto w-full overflow-hidden p-4", className)}> */
				// TODO: CREATE A FULL BLEED AND FULL BUT STILL RESPECT GRID
				<div
					className={cn(
						"p-4 w-full relative overflow-hidden 2xl:max-w-[70svw] 2xl:mx-auto",
						className,
					)}
				>
					{children}
				</div>
			) : (
				children
			)}
		</div>
	);
};
