import { useGSAP } from "@gsap/react";
import { cn } from "cn";
import gsap from "gsap";
import { useRef, useState } from "react";

interface HamburgerButton extends React.ComponentProps<"button"> {
	isOpen?: boolean;
	onClose?: () => void;
	defaultIsOpen?: boolean;
}

export const HamburgerButton = ({
	isOpen: externalIsOpen,
	onClose,
	defaultIsOpen = false,
	onClick,
	className,
	...props
}: HamburgerButton) => {
	const [isOpen, setIsOpen] = useState(defaultIsOpen);
	const containerRef = useRef<HTMLButtonElement | null>(null);
	const tl = useRef<gsap.core.Timeline | null>(null);

	const isControlled = externalIsOpen !== undefined;
	const stateIsOpen = isControlled ? externalIsOpen : isOpen;

	const handleChange: React.MouseEventHandler<HTMLButtonElement> = (e) => {
		onClick?.(e);

		if (!isControlled) {
			setIsOpen((prev) => !prev);
		}

		onClose?.();
	};

	useGSAP(
		() => {
			if (!containerRef.current) return;

			tl.current = gsap
				.timeline({
					paused: true,
					id: "hamburger-btn",
					defaults: {
						duration: 0.4,
						ease: "power2.inOut",
					},
				})
				.to(
					".stripe-top",
					{
						morphSVG: "#x-top",
					},
					0,
				)
				.to(
					".stripe-middle",
					{
						morphSVG: "#x-middle",
					},
					0,
				)
				.to(
					".stripe-bottom",
					{
						morphSVG: "#x-bottom",
					},
					0,
				);
		},
		{ scope: containerRef },
	);

	useGSAP(() => {
		if (!tl.current) return;

		if (stateIsOpen) {
			tl.current.play();
		} else {
			tl.current.reverse();
		}
	}, [stateIsOpen]);

	return (
		<button
			{...props}
			ref={containerRef}
			type="button"
			className={cn("bg-foreground rounded-full cursor-pointer", className)}
			onClick={handleChange}
			aria-label="Toggle Menu"
		>
			<svg
				viewBox="0 0 40 40"
				xmlns="http://www.w3.org/2000/svg"
				className="size-10"
			>
				<title>Hamburger Button</title>

				<g fill="var(--b-background)">
					<path
						className="stripe-top"
						d="M 12 15 L 28 15 A 1 1 0 0 1 29 16 A 1 1 0 0 1 28 17 L 12 17 A 1 1 0 0 1 11 16 A 1 1 0 0 1 12 15 Z"
					/>
					<path
						className="stripe-middle"
						d="M 12 19 L 28 19 A 1 1 0 0 1 29 20 A 1 1 0 0 1 28 21 L 12 21 A 1 1 0 0 1 11 20 A 1 1 0 0 1 12 19 Z"
					/>
					<path
						className="stripe-bottom"
						d="M 12 23 L 28 23 A 1 1 0 0 1 29 24 A 1 1 0 0 1 28 25 L 12 25 A 1 1 0 0 1 11 24 A 1 1 0 0 1 12 23 Z"
					/>
				</g>

				<defs>
					<path
						id="x-top"
						d="M 15.05 13.636 L 26.364 24.95 A 1 1 0 0 1 24.95 26.364 L 13.636 15.05 A 1 1 0 0 1 15.05 13.636 Z"
					/>
					<path
						id="x-middle"
						d="M 21 19 L 19 19 A 1 1 0 0 1 19 21 L 21 21 A 1 1 0 0 1 21 19 Z"
					/>
					<path
						id="x-bottom"
						d="M 13.636 24.95 L 24.95 13.636 A 1 1 0 0 1 26.364 15.05 L 15.05 26.364 A 1 1 0 0 1 13.636 24.95 Z"
					/>
				</defs>
			</svg>
		</button>
	);
};
