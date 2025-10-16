export interface About {
	title: string;
	subtitle: string;
	content: string;
	image: string;
	imageAlt: string;
	experience: number;
	projects: number;
	clients: number;
	skills: string[];
	socialLinks: {
		github?: string;
		linkedin?: string;
		twitter?: string;
		email?: string;
		website?: string;
	};
	seo?: {
		metaTitle: string;
		metaDescription: string;
		keywords: string[];
		ogImage: string;
	};
	isActive: boolean;
}

const about = {
	title: "About Me",
	subtitle: "Professional Developer & Technology Enthusiast",
	content:
		"I'm a passionate developer with expertise in modern web technologies. I enjoy creating innovative solutions and sharing knowledge with the community.\n\nWith years of experience in full-stack development, I've worked on various projects ranging from small startups to enterprise applications. My approach combines technical excellence with user-centered design.\n\nWhen I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or sharing my insights through blog posts and tutorials.",
	image: "/hero-portrait.png",
	imageAlt: "Professional portrait",
	experience: 5,
	projects: 50,
	clients: 25,
	skills: [
		"JavaScript",
		"TypeScript",
		"React",
		"Next.js",
		"Node.js",
		"MongoDB",
		"Tailwind CSS",
		"WordPress",
	],
	socialLinks: {
		github: "https://github.com/nowshen-khan",
		linkedin: "https://linkedin.com/in/nowshen-khan",
		email: "nowshen.anjum@gmail.com",
		website: "https://nowshen.com",
	},
	seo: {
		metaTitle: "About Me - Professional Developer Profile",
		metaDescription:
			"Learn about my professional journey as a full-stack developer, my skills in modern technologies, and my experience building scalable web applications.",
		keywords: [
			"developer",
			"full-stack",
			"web development",
			"programming",
			"technology",
			"frontend",
			"backend",
			"mern",
			"wordpress",
		],
		ogImage: "/og-about.jpg",
	},
	isActive: true,
};

export default about;
