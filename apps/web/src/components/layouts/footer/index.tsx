import { ClientOnly } from "@/components/ui/client-only";
import { GridCell } from "@/components/ui/grid/grid-cell";
import { GridContainer } from "@/components/ui/grid/grid-container";
import { CONTACT_LIST } from "@/config/constants";

import { CopyrightSection } from "./copyright-section";

const FooterSection = () => {
	const contactList = [...CONTACT_LIST];

	return (
		<GridContainer space="lg" className="px-10 py-14 lg:px-0">
			<GridCell id="contact">
				<div className="flex gap-x-8">
					<div className="flex flex-col gap-y-8">
						<h3 className="font-display text-lg font-medium text-primary">
							Connect
						</h3>

						<ul className="flex flex-col gap-y-1 text-lg transition-colors duration-300">
							{contactList.map(([title, url]) => (
								<li
									key={url}
									className="selection:bg-primary selection:text-foreground hover:text-primary"
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
				<ClientOnly>
					<CopyrightSection />
				</ClientOnly>
			</GridCell>
		</GridContainer>
	);
};

export default FooterSection;
