import { useEffect, useState } from "react";

export const useScrolled = (threshold = 80) => {
	const [isScrolled, setIsScrolled] = useState(false);

	useEffect(() => {
		let frame = 0;

		const update = () => {
			frame = 0;
			setIsScrolled(window.scrollY > threshold);
		};

		const onScroll = () => {
			if (frame) return;
			frame = requestAnimationFrame(update);
		};

		update();
		window.addEventListener("scroll", onScroll, { passive: true });

		return () => {
			window.removeEventListener("scroll", onScroll);
			if (frame) cancelAnimationFrame(frame);
		};
	}, [threshold]);

	return isScrolled;
};
