import { useGSAP } from "@gsap/react";
import { cn } from "cn";
import gsap from "gsap";
import { useRef } from "react";

import { WebsiteThumbnail } from "./website-thumbnail";

interface ShowcaseCard extends React.ComponentProps<"button"> {
	title: string;
	desc: string;
	thumbnailUrl: string;
}

export const ShowcaseCard = ({
	title,
	desc,
	thumbnailUrl,
	className,
	...props
}: ShowcaseCard) => {
	const containerRef = useRef<HTMLButtonElement>(null);
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const cardTitleRef = useRef<HTMLHeadingElement>(null);

	// Iframe param and animation
	const iContainerWidth = 240;
	const iContainerHeight = 144;
	const iBaseWidth = 1280;
	const iBaseHeight = 720;
	const zoomFactor = 1.1;

	useGSAP(
		() => {
			const containerElement = containerRef.current;
			if (!containerElement) return;

			const iframeElement = iframeRef.current;
			const cardTitleElement = cardTitleRef.current;

			if (!iframeElement || !cardTitleElement) return;

			// iframe scale animation

			const iScaleX = iContainerWidth / iBaseWidth;
			const iScaleY = iContainerHeight / iBaseHeight;
			const iHoverScaleX = iScaleX * zoomFactor;
			const iHoverScaleY = iScaleY * zoomFactor;
			const hoverLeft = -((iBaseWidth * zoomFactor - iBaseWidth) / 10);
			const hoverTop = -((iBaseHeight * zoomFactor - iBaseHeight) / 10);

			const iFrameOnMouseEnter = () => {
				gsap.to(iframeElement, {
					left: `${hoverLeft}px`,
					top: `${hoverTop}px`,
					transform: `scale(${iHoverScaleX}, ${iHoverScaleY})`,
					duration: 0.4,
					ease: "power1.inOut",
				});
			};

			const iFrameOnMouseLeave = () => {
				gsap.to(iframeElement, {
					left: `${0}px`,
					top: `${0}px`,
					transform: `scale(${iScaleX}, ${iScaleY})`,
					duration: 0.4,
					ease: "power1.inOut",
				});
			};

			// card title sliding background animation

			const titleOnMouseEnter = () => {
				gsap.to(cardTitleElement, {
					backgroundPosition: "0% 0%",
					duration: 0.4,
					ease: "power1.inOut",
				});
			};

			const titleOnMouseLeave = () => {
				gsap.to(cardTitleElement, {
					backgroundPosition: "100% 0%",
					duration: 0.4,
					ease: "power1.inOut",
				});
			};

			containerElement.addEventListener("mouseenter", iFrameOnMouseEnter);
			containerElement.addEventListener("mouseleave", iFrameOnMouseLeave);
			containerElement.addEventListener("mouseenter", titleOnMouseEnter);
			containerElement.addEventListener("mouseleave", titleOnMouseLeave);

			return () => {
				containerElement.removeEventListener("mouseenter", iFrameOnMouseEnter);
				containerElement.removeEventListener("mouseleave", iFrameOnMouseLeave);
				containerElement.removeEventListener("mouseenter", titleOnMouseEnter);
				containerElement.removeEventListener("mouseleave", titleOnMouseLeave);
			};
		},
		{ scope: containerRef },
	);

	return (
		<button
			{...props}
			className={cn(
				"flex flex-col select-none rounded-lg bg-muted gap-y-8 h-full flex-0 p-2 transition-colors duration-700 cursor-pointer group hover:bg-muted/80 hover:shadow-sm hover:shadow-foreground/20 border-[0.1px] border-foreground/20",
				className,
			)}
			ref={containerRef}
		>
			<div className="relative h-36 w-60 overflow-hidden rounded-md">
				<div className="absolute inset-0 z-10" />

				<WebsiteThumbnail
					ref={iframeRef}
					src={thumbnailUrl}
					title={title}
					width={iContainerWidth}
					height={iContainerHeight}
					baseWidth={iBaseWidth}
					baseHeight={iBaseHeight}
					className="absolute top-0 left-0 origin-top-left"
				/>
			</div>

			<div className="flex max-w-[85%] flex-col gap-y-2 text-start leading-tight tracking-[-0.06em] select-text!">
				<h3
					ref={cardTitleRef}
					className="w-fit bg-[linear-gradient(to_right,var(--b-primary)_50%,transparent_50%)] bg-size-[200%_100%] bg-position-[100%_0%] font-display font-bold"
				>
					{title}
				</h3>

				<p className="line-clamp-3 text-sm text-muted-foreground selection:bg-primary">
					{desc}
				</p>
			</div>
		</button>
	);
};
