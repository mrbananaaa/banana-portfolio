import {
	SiAlacritty,
	SiBun,
	SiCloudflare,
	SiDocker,
	SiFigma,
	SiFirebase,
	SiGo,
	SiGooglecloud,
	SiGsap,
	SiMongodb,
	SiNeovim,
	SiNextdotjs,
	SiNixos,
	SiNodedotjs,
	SiPayloadcms,
	SiPocketbase,
	SiPostgresql,
	SiReact,
	SiReactquery,
	SiReactrouter,
	SiRedis,
	SiShadcnui,
	SiSocketdotio,
	SiSupabase,
	SiTailwindcss,
	SiTanstack,
	SiTmux,
	SiTurborepo,
	SiTypescript,
	SiVercel,
	SiVite,
	SiVitest,
} from "@icons-pack/react-simple-icons";

import { type TechIcon } from "./types";

export const technologies: TechIcon[] = [
	{
		name: "ts",
		color: "default",
		Icon: SiTypescript,
		categories: ["language", "frontend", "backend"],
	},
	{
		name: "node",
		color: "default",
		Icon: SiNodedotjs,
		categories: ["language", "backend"],
	},
	{
		name: "bun",
		color: "default",
		Icon: SiBun,
		categories: ["language", "backend"],
	},
	{ name: "react", color: "default", Icon: SiReact, categories: ["frontend"] },
	{
		name: "tailwind",
		color: "default",
		Icon: SiTailwindcss,
		categories: ["frontend"],
	},
	{
		name: "shadcnui",
		color: "default",
		Icon: SiShadcnui,
		categories: ["frontend"],
	},
	{
		name: "react-query",
		color: "default",
		Icon: SiReactquery,
		categories: ["frontend"],
	},
	{
		name: "react-router",
		color: "default",
		Icon: SiReactrouter,
		categories: ["frontend"],
	},
	{
		name: "tanstack",
		color: "default",
		strokeColor: "var(--color-amber-700)",
		Icon: SiTanstack,
		categories: ["frontend"],
	},
	{
		name: "gsap",
		color: "default",
		strokeColor: "var(--color-emerald-700)",
		Icon: SiGsap,
		categories: ["frontend"],
	},
	{
		name: "nextjs",
		color: "default",
		Icon: SiNextdotjs,
		categories: ["infrastructure"],
	},
	{
		name: "payloadcms",
		color: "default",
		Icon: SiPayloadcms,
		categories: ["backend"],
	},
	{ name: "vite", color: "default", Icon: SiVite, categories: ["frontend"] },
	{
		name: "vitest",
		color: "default",
		Icon: SiVitest,
		categories: ["frontend", "backend"],
	},
	{
		name: "golang",
		color: "default",
		Icon: SiGo,
		categories: ["language", "backend"],
	},
	{ name: "pg", color: "default", Icon: SiPostgresql, categories: ["backend"] },
	{ name: "mongo", color: "default", Icon: SiMongodb, categories: ["backend"] },
	{ name: "redis", color: "default", Icon: SiRedis, categories: ["backend"] },
	{
		name: "socketio",
		color: "default",
		Icon: SiSocketdotio,
		categories: ["backend"],
	},
	{
		name: "docker",
		color: "default",
		Icon: SiDocker,
		categories: ["infrastructure"],
	},
	{
		name: "vercel",
		color: "default",
		Icon: SiVercel,
		categories: ["infrastructure"],
	},
	{
		name: "cloudflare",
		color: "default",
		Icon: SiCloudflare,
		categories: ["infrastructure"],
	},
	{
		name: "google-cloud",
		color: "default",
		Icon: SiGooglecloud,
		categories: ["infrastructure"],
	},
	{
		name: "supabase",
		color: "default",
		Icon: SiSupabase,
		categories: ["infrastructure"],
	},
	{
		name: "firebase",
		color: "default",
		Icon: SiFirebase,
		categories: ["infrastructure"],
	},
	{
		name: "pocketbase",
		color: "default",
		strokeColor: "var(--color-blue-700)",
		Icon: SiPocketbase,
		categories: ["infrastructure"],
	},
	{ name: "nixos", color: "default", Icon: SiNixos, categories: ["tooling"] },
	{
		name: "alacritty",
		color: "default",
		Icon: SiAlacritty,
		categories: ["tooling"],
	},
	{ name: "tmux", color: "default", Icon: SiTmux, categories: ["tooling"] },
	{ name: "neovim", color: "default", Icon: SiNeovim, categories: ["tooling"] },
	{
		name: "turbo",
		color: "default",
		Icon: SiTurborepo,
		categories: ["tooling"],
	},
	{ name: "figma", color: "default", Icon: SiFigma, categories: ["tooling"] },
];

export const IconList = () => {
	return (
		<>
			{technologies.map(({ name, color, strokeColor, Icon }) => {
				return (
					<div
						key={name}
						style={{
							borderStyle: "solid",
							borderWidth: "0.1px",
							borderColor: `color-mix(in oklab, ${strokeColor ? strokeColor : ""} 30%, transparent)`,
						}}
						className="carousel-item h-fit cursor-pointer rounded-lg bg-muted p-1.5 shadow-md shadow-foreground/15"
					>
						<Icon
							color={color}
							style={{
								strokeWidth: "0.3px",
								stroke: `${strokeColor ? strokeColor : ""}`,
							}}
							className="size-8"
						/>
					</div>
				);
			})}
		</>
	);
};
