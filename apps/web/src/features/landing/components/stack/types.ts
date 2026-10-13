import { type IconType } from "@icons-pack/react-simple-icons";

export type TechCategory =
	| "language"
	| "frontend"
	| "backend"
	| "infrastructure"
	| "tooling";

export interface TechIcon {
	name: string;
	color: string;
	strokeColor?: string;
	Icon: IconType;
	categories?: TechCategory[];
}

export interface TechStack {
	title: string;
	subtitle: string;
	category: TechCategory;
}
