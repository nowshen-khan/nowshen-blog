interface FooterLink {
	label: string;
	href: string;
	order?: number;
}

interface FooterColumn {
	title: string;
	links: FooterLink[];
}

interface FooterSocialLinks {
	facebook?: string;
	twitter?: string;
	github?: string;
	linkedin?: string;
	email?: string;
}

export interface FooterData {
	logoText: string;
	aboutText: string;
	columns: FooterColumn[];
	socialLinks: FooterSocialLinks;
	location: string;
	copyright: string;
}
const footer = {
	logoText: "blog.Nowshen",
	aboutText: "Digital insights by Nowshen Anjuman Khan",

	columns: [
		{
			title: "Category",
			links: [
				{ label: "CSS", href: "/category/css", order: 1 },
				{ label: "JavaScript", href: "/category/javascript", order: 2 },
				{ label: "Tailwind", href: "/category/tailwind", order: 3 },
				{ label: "React JS", href: "/category/react", order: 4 },
				{ label: "More Category", href: "/categories", order: 5 },
			],
		},
		{
			title: "About Me",
			links: [
				{ label: "About", href: "/about", order: 1 },
				{ label: "Projects", href: "/projects", order: 2 },
				{ label: "Achievements", href: "/achievements", order: 3 },
			],
		},
		{
			title: "Follow Me",
			links: [
				{ label: "Medium", href: "https://medium.com", order: 1 },
				{ label: "Instagram", href: "https://instagram.com", order: 2 },
				{ label: "Twitter", href: "https://twitter.com", order: 3 },
				{ label: "Facebook", href: "https://facebook.com", order: 4 },
			],
		},
		{
			title: "Terms and Conditions",
			links: [
				{ label: "Privacy Policy", href: "/privacy" },
				{ label: "Terms and Conditions", href: "/terms" },
			],
		},
	],
	socialLinks: {
		facebook: "https://facebook.com/nowshen",
		twitter: "https://twitter.com/nowshen",
		github: "https://github.com/nowshen",
		linkedin: "https://linkedin.com/in/nowshen",
		email: "hello@nowshen.com",
	},
	location: "Gazipur, Dhaka, Bangladesh",
	copyright: "© 2025 blog.Nowshen",
};

export default footer;
