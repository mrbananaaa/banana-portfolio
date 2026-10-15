export const CopyrightSection = () => {
	const year = new Date().getFullYear();

	return (
		<>
			<div className="justify-self-center md:justify-self-start">
				©{year} mrbananaaa, All rights reserved.
			</div>

			<div className="place-self-center">
				<img src="/logo-dark.svg" alt="mrbananaaa-logo" className="size-8" />
			</div>

			<div className="justify-self-center md:justify-self-end">
				Privacy Policy. Terms of Use.
			</div>
		</>
	);
};
