export const CONTACT_LIST = new Map<string, string>([
	["Github", "https://github.com/mrbananaaa"],
	["Instagram", "https://www.instagram.com/mr.bananaaa69"],
	["WhatsApp", "https://wa.me/message/NCWEAPJES7FVK1"],
	["Threads", "https://www.threads.com/@mr.bananaaa69"],
	["Email", "mailto:mailme.mrbananaaaid@gmail.com"],
]);

interface TechStack {
	title: string;
	subtitle: string;
	list: string[];
}

export const Techstack: TechStack[] = [
	{
		title: "Frontend",
		subtitle: "I'm currently working around ReactJS ecosystem on Frontend.",
		list: ["React asede kocol", "TailwindCSS", "NextJS"],
	},
	{
		title: "Backend",
		subtitle: "I'm currently working around ReactJS ecosystem on Frontend.",
		list: [
			"Golang, Node.js, Bun",
			"Typed SQL workflow w/ sqlc in golang, and drizzle in Node.js/bun",
			"Postgresql since day one",
		],
	},
	{
		title: "Infrastructure",
		subtitle: "I'm currently working around ReactJS ecosystem on Frontend.",
		list: [
			"Real-time apps w/ Websocket scaling",
			"Redis Pub/Sub + Horizontal scaling",
			"API design w/ Typed, Secure data flow",
		],
	},
];
