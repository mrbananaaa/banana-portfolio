import { cn } from "cn";

interface WebsiteThumbnail extends React.ComponentProps<"iframe"> {
	src: string;
	width?: number;
	height?: number;
	baseWidth?: number;
	baseHeight?: number;
}

export const WebsiteThumbnail = ({
	src,
	title,
	width = 240,
	height = 160,
	baseWidth = 1280,
	baseHeight = 720,
	className,
	...props
}: WebsiteThumbnail) => {
	const scaleX = width / baseWidth;
	const scaleY = height / baseHeight;

	return (
		<iframe
			loading="lazy"
			{...props}
			src={src}
			title={`Thumbnail preview of ${title ?? src}`}
			sandbox="allow-scripts"
			className={cn("border-none", className)}
			style={{
				width: `${baseWidth}px`,
				height: `${baseHeight}px`,
				transform: `scale(${scaleX}, ${scaleY})`,
			}}
		/>
	);
};
