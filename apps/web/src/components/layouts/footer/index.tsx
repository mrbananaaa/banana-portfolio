import { GridCell } from "@/components/ui/grid/grid-cell";
import { GridContainer } from "@/components/ui/grid/grid-container";
import { CONTACT_LIST } from "@/config/constants";

const FooterSection = () => {
	const year = new Date().getFullYear();

	return (
		<GridContainer space="lg" className="px-10 py-14 lg:px-0" id="footer">
			<GridCell id="contact">
				<div className="flex gap-x-8">
					<div className="flex flex-col gap-y-8">
						<h3 className="font-display text-lg font-medium text-primary">
							Connect
						</h3>

						<ul className="flex flex-col gap-y-1 text-lg">
							{[...CONTACT_LIST].map(([title, url]) => (
								<li
									key={url}
									className="transition-color duration-300 selection:bg-primary selection:text-foreground hover:text-primary"
								>
									<a href={url} target="_blank" rel="noopener">
										{title}
									</a>
								</li>
							))}
						</ul>
					</div>

					<div></div>
				</div>
			</GridCell>

			<GridCell className="grid grid-cols-1 items-center gap-y-4 text-sm font-light tracking-tighter text-muted-foreground selection:bg-primary selection:text-foreground md:grid-cols-3 md:gap-y-0">
				<div className="justify-self-center md:justify-self-start">
					©{year} mrbananaaa, All rights reserved.
				</div>

				<div className="place-self-center">
					<img src="/logo-dark.svg" alt="mrbananaaa-logo" className="size-8" />
				</div>

				<div className="justify-self-center md:justify-self-end">
					Privacy Policy. Terms of Use.
				</div>
			</GridCell>
		</GridContainer>
	);
};

export default FooterSection;
