import { useNavigate } from "@tanstack/react-router";
import { Fragment } from "react/jsx-runtime";

import { SectionHeading } from "@/components/ui/typography";
import { CONTACT_LIST } from "@/config/constants";
import { useScrollTo } from "@/hooks/use-scroll-to";

export const ContactSection = () => {
	const { scrollTo } = useScrollTo();
	const navigate = useNavigate();
	const contactList = [...CONTACT_LIST].slice(0, 3);

	const navigateToFooter = async (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();

		scrollTo("#footer");

		await navigate({
			hash: "footer",
			hashScrollIntoView: false,
			replace: true,
			resetScroll: false,
		});
	};

	return (
		<div className="flex h-full w-full items-center justify-center">
			<div className="flex w-full flex-col items-center">
				<SectionHeading
					title="Let's Build Something Together."
					subtitle="If you’re working on systems that require clarity, reliability, or real-time architecture - let’s talk."
				/>

				<div className="flex flex-col items-center gap-y-6">
					<div className="flex items-center justify-center gap-x-2">
						<a href={CONTACT_LIST.get("Email")} target="_blank" rel="noopener">
							<button
								type="button"
								className="transition-color block h-14 w-38 cursor-pointer rounded-lg bg-primary text-center text-sm font-medium tracking-[-0.06em] text-white shadow-md duration-700 hover:bg-[#ffc000]"
							>
								Email Me
							</button>
						</a>

						<button
							type="button"
							className="transition-color block h-14 w-38 cursor-pointer rounded-lg bg-white text-center text-sm font-medium tracking-[-0.06em] shadow-md duration-700 hover:bg-white/30"
						>
							View Resume
						</button>
					</div>

					<div className="flex flex-col items-center gap-y-2">
						<div className="flex items-center justify-center gap-x-3 text-xs text-muted-foreground">
							{contactList.map(([title, url], i) => (
								<Fragment key={url}>
									<a href={url} target="_blank" rel="noopener">
										{title}
									</a>

									{contactList.length - 1 !== i && <p>&bull;</p>}
								</Fragment>
							))}
						</div>

						{/* biome-ignore lint/a11y/useValidAnchor: I wanna use anchor for this one */}
						<a href="#footer" onClick={(e) => navigateToFooter(e)}>
							<div className="flex animate-pulse cursor-pointer flex-col items-center -space-y-1.5 text-xs">
								<div>more</div>
								<div>&#9662;</div>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};
