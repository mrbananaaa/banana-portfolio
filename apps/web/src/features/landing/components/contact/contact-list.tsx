import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MoveUpRight } from "lucide-react";
import { Fragment, useRef } from "react";

import { CONTACT_LIST } from "@/config/constants";

export const ContactList = () => {
	const containerRef = useRef(null);
	const anchorRef = useRef<(HTMLAnchorElement | null)[]>([]);
	const divRef = useRef<(HTMLDivElement | null)[]>([]);

	const setAnchorRef =
		(i: number): React.RefCallback<HTMLAnchorElement> =>
		(el) => {
			anchorRef.current[i] = el;
			return undefined;
		};

	const setDivRef =
		(i: number): React.RefCallback<HTMLDivElement> =>
		(el) => {
			divRef.current[i] = el;
			return undefined;
		};

	useGSAP(
		() => {
			const anchorElement = anchorRef.current;
			const divElement = divRef.current;

			if (!anchorElement || !divElement) return;

			const onMouseEnterHandler = (i: number) => () => {
				gsap.to(divElement[i], {
					backgroundPosition: "0% 0%",
					color: "var(--b-primary)",
					duration: 0.4,
					ease: "power3.inOut",
				});
			};

			const onMouseLeaveHandler = (i: number) => () => {
				gsap.to(divElement[i], {
					backgroundPosition: "100% 0%",
					color: "var(--b-muted-foreground)",
					duration: 0.4,
					ease: "power3.inOut",
				});
			};

			const containers = anchorRef.current.filter(
				(item): item is HTMLAnchorElement => item !== null,
			);

			containers.forEach((containerEl, i) => {
				containerEl.addEventListener("mouseenter", onMouseEnterHandler(i));
				containerEl.addEventListener("mouseleave", onMouseLeaveHandler(i));
			});

			return () => {
				containers.forEach((containerEl, i) => {
					containerEl.removeEventListener("mouseenter", onMouseEnterHandler(i));
					containerEl.removeEventListener("mouseleave", onMouseLeaveHandler(i));
				});
			};
		},
		{ scope: containerRef },
	);

	return (
		<Fragment ref={containerRef}>
			{[...CONTACT_LIST].map(([title, url], i) => (
				<a
					ref={setAnchorRef(i)}
					key={url}
					href={url}
					target="_blank"
					rel="noopener"
				>
					<div
						ref={setDivRef(i)}
						className="group group flex items-center gap-x-4 bg-[linear-gradient(to_right,var(--b-foreground)_50%,transparent_50%)] bg-size-[200%_100%] bg-position-[100%_0%] px-2 py-0.5"
					>
						<p>{title}</p>
						<MoveUpRight className="size-4 transition-colors duration-400 group-hover:text-primary" />
					</div>
				</a>
			))}
		</Fragment>
	);
};
