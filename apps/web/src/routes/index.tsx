import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<div className="flex min-h-screen items-center justify-center">
			<div>HOLA SENOR</div>
		</div>
	);
}
