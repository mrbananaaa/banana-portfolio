import { useSyncExternalStore } from "react";

// Server-safe subscriber function
const subscribe = (query: string) => (callback: () => void) => {
	if (typeof window === "undefined") return () => {};
	const media = window.matchMedia(query);
	media.addEventListener("change", callback);
	return () => media.removeEventListener("change", callback);
};

// Client-safe evaluation function
const getSnapshot = (query: string) => () => {
	if (typeof window === "undefined") return false;
	return window.matchMedia(query).matches;
};

// Server snapshot (fallback value during SSR)
const getServerSnapshot = () => false;

export function useMediaQuery(query: string): boolean {
	return useSyncExternalStore(
		subscribe(query),
		getSnapshot(query),
		getServerSnapshot,
	);
}
