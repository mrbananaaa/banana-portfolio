import { cn } from "cn";

interface Logo extends React.ComponentProps<"img"> {}

export const Logo = ({ className, ...props }: Logo) => {
	return (
		<img
			src="/logo-dark.svg"
			alt="mrbananaaa logo's"
			className={cn("object-cover", className)}
			{...props}
		/>
	);
};
