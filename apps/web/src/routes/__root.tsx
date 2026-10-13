import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	HeadContent,
	Outlet,
	Scripts,
	createRootRoute,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Analytics } from "@vercel/analytics/react";

import { AppProvider } from "@/components/layouts/providers";

import "@fontsource-variable/dm-sans";
import "@fontsource-variable/inter";

import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Devyan Astagiri — Full-Stack Engineer | mrbananaaa",
			},
			{
				name: "description",
				content:
					"Portfolio of Devyan Dewandaru Astagiri, also known as mrbananaaa, a self-taught full-stack engineer focused on scalable systems, APIs, and modern web applications",
			},

			// Open Graph
			{
				property: "og:title",
				content: "Devyan Dewandaru Astagiri — Full-Stack Engineer",
			},
			{
				property: "og:description",
				content:
					"Self-taught full-stack engineer focused on APIs, real-time systems, and scalable web applications.",
			},
			{
				property: "og:type",
				content: "website",
			},
			{
				property: "og:image",
				content: "https://yourdomain.com/og-image.png",
			},

			// X / Twitter
			{
				name: "twitter:card",
				content: "summary_large_image",
			},
			{
				name: "twitter:title",
				content: "Devyan Dewandaru Astagiri — Full-Stack Engineer",
			},
			{
				name: "twitter:description",
				content:
					"Self-taught full-stack engineer focused on APIs, real-time systems, and scalable web applications.",
			},
			{
				name: "twitter:image",
				content: "https://yourdomain.com/og-image.png",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "canonical",
				href: "https://mrbananaaa.vercel.app/",
			},
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/logo-dark.svg",
			},
		],
	}),
	shellComponent: RootDocument,
	component: RootComponent,
});

function RootComponent() {
	return (
		<AppProvider>
			<Outlet />
		</AppProvider>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="antialiased">
			<head>
				<HeadContent />
			</head>
			<body className="bg-background text-foreground">
				{children}

				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>

				<Analytics />
				<Scripts />
			</body>
		</html>
	);
}
