import { type ReactNode, useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export const ClientOnly = ({
	children,
	fallback = null,
}: {
	children: ReactNode;
	fallback?: ReactNode;
}) => {
	const isServer = useSyncExternalStore(
		emptySubscribe,
		() => false,
		() => true,
	);

	return isServer ? fallback : children;
};
