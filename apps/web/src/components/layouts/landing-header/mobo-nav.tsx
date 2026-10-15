import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef, useState } from "react";

import { HamburgerButton } from "@/components/ui/hamburger-button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface MoboNav {
	nav?: React.ReactNode;
}

const Logo = () => {
	const containerRef = useRef(null);
	const logoRef = useRef(null);

	useGSAP(
		() => {
			gsap.to(logoRef.current, {
				rotation: 360,
				duration: 4,
				ease: "none",
				repeat: -1,
				transformOrigin: "center center",
			});
		},
		{ scope: containerRef },
	);

	return (
		<div
			ref={containerRef}
			className="ml-4 flex size-10 items-center justify-center overflow-hidden rounded-full border border-primary"
		>
			<img
				ref={logoRef}
				src="/logo-dark.svg"
				alt="mrbananaaa-logo"
				className="size-8 object-cover"
			/>
		</div>
	);
};

export const MoboNav = ({ nav }: MoboNav) => {
	const [isNavOpen, setIsNavOpen] = useState(false);

	return (
		<div className="md:hidden">
			<Sheet open={isNavOpen} onOpenChange={setIsNavOpen}>
				<SheetTrigger render={<HamburgerButton isOpen={isNavOpen} />} />

				<SheetContent
					side="right"
					className="m-0 bg-foreground/95 p-0 tracking-[-0.06em] data-[side=right]:max-h-svh data-[side=right]:w-[101svw]"
					showCloseButton={false}
				>
					<div className="flex h-full w-full flex-col py-2 pr-2 pl-3.5">
						<div className="text-transparent">w</div>

						<div className="flex justify-between pr-2">
							{isNavOpen ? <Logo /> : null}

							<HamburgerButton
								isOpen={isNavOpen}
								onClose={() => setIsNavOpen((prev) => !prev)}
							/>
						</div>

						<div className="mt-20 no-scrollbar flex-1 overflow-x-hidden overflow-y-scroll">
							<button
								type="button"
								className="block w-full"
								onClick={() => {
									setIsNavOpen((prev) => !prev);
								}}
							>
								<ul className="w-full flex items-start cursor-default flex-col gap-6 gap-y-3 pl-4 font-display text-6xl font-semibold text-background">
									{nav ? nav : null}
								</ul>
							</button>
						</div>

						<div className="flex items-center justify-center text-muted-foreground">
							<span className="text-sm font-light">
								Made with love by @mrbananaaa
							</span>
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
};
