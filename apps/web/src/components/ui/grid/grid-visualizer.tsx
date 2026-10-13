import { GridCell } from "./grid-cell";
import { GridContainer } from "./grid-container";

interface GridVisualizerProps extends React.ComponentProps<"div"> {}

export const GridVisualizer = ({ ref, ...props }: GridVisualizerProps) => {
	if (process.env.NODE_ENV === "production") return null;

	return (
		<div
			{...props}
			className="pointer-events-none fixed inset-0 z-50 h-full w-full overflow-hidden"
			ref={ref}
		>
			<GridContainer>
				{Array.from({ length: 12 }, (_, i) => i + 1).map((v, index) => (
					<GridCell
						key={v}
						span={1}
						className={`${index >= 4 ? "hidden sm:block" : ""} ${index >= 8 ? "sm:hidden lg:block" : ""} h-full min-h-screen border-x border-red-500/10 bg-red-500/8`}
					/>
				))}
			</GridContainer>
		</div>
	);
};
