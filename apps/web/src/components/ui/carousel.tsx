import { cn } from "cn";
import { type EmblaOptionsType } from "embla-carousel";
import AutoScroll, {
	type AutoScrollOptionsType,
} from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import WheelGestures from "embla-carousel-wheel-gestures";
import { useEffect } from "react";

interface AutoScrollOpt extends AutoScrollOptionsType {
	enable: boolean;
}

interface CarouselProps extends React.ComponentProps<"div"> {
	children: React.ReactNode;
	options?: EmblaOptionsType;
	autoScrollOption?: AutoScrollOpt;
}

export const Carousel = ({
	children,
	options,
	autoScrollOption,
	ref,
	className,
	...props
}: CarouselProps) => {
	const emblaOpt = options ? options : null;

	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			loop: true,
			axis: "x",
			...emblaOpt,
		},
		[
			WheelGestures({
				wheelDraggingClass: "wheel-gesture-container",
				forceWheelAxis: "x",
			}),
			AutoScroll({
				...autoScrollOption,
			}),
		],
	);

	useEffect(() => {
		if (!emblaApi) return;
		const plugins = emblaApi.plugins();

		if (autoScrollOption?.enable) {
			plugins.autoScroll?.play();
		}
	}, [emblaApi, autoScrollOption?.enable]);

	return (
		<div
			className="flex h-full w-full flex-col items-center justify-center gap-y-2 md:flex-1"
			ref={ref}
			{...props}
		>
			<div
				ref={emblaRef}
				className={cn("h-full w-full overflow-x-hidden", className)}
				dir="ltr"
			>
				{/* INFO: Container */}
				<div className="embla__container wheel-gesture-container flex h-full w-full">
					{children}
				</div>
			</div>
		</div>
	);
};
