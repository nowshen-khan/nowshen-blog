// lib/site-settings.ts
import connectDB from "./mongodb";
import SiteSettings from "@/models/SiteSettings";
import { Blog } from "@/models/Blog";

export async function getSiteSettings() {
	try {
		await connectDB();

		let settings = await SiteSettings.findOne();

		if (!settings) {
			// Create default settings if none exist
			settings = await SiteSettings.create({
				siteName: "Nowshen",
				title: "Nowshen - Web Developer & Blogger",
				description:
					"Personal blog about web development, programming tips, and tech journey",
				navbar: {
					logoText: "Nowshen",
					navLinks: [
						{ name: "Home", href: "/", exact: true },
						{ name: "About", href: "/about" },
						{ name: "Services", href: "/services" },
						{ name: "Blog", href: "/blog" },
						{ name: "Contact", href: "/contact" },
					],
				},

				hero: {
					startYear: 2024,
					welcomeText: "Welcome to My Digital Space",
					title: "Hi, I'm Nowshen",
					subtitle: "Web Developer & Blogger",
					description:
						"I write about web development, programming tips, and share my journey in tech...",
					expertise: [
						"JavaScript",
						"React",
						"Next.js",
						"TypeScript",
						"Node.js",
					],
					stats: [],
					buttons: {
						primary: { text: "Read My Blog", href: "/blog" },
						secondary: { text: "My Journey", href: "/about" },
					},
				},
				footer: {
					aboutText: "I'm Nowshen, a passionate web developer and blogger.",
					footerLinks: [
						{ label: "Privacy Policy", href: "/privacy" },
						{ label: "Terms of Service", href: "/terms" },
					],
					copyrightText: "© 2025 Nowshen. All rights reserved.",
				},
				socialLinks: {
					facebook: "https://facebook.com/nowshen",
					twitter: "https://twitter.com/nowshen",
					github: "https://github.com/nowshen",
					linkedin: "https://linkedin.com/in/nowshen",
					email: "hello@nowshen.com",
				},
			});
		}

		// 🧠 Fetch dynamic blog count
		const blogCount = await Blog.countDocuments({ isPublished: true });
		const yearsOfExperience =
			new Date().getFullYear() - (settings.hero?.startYear || 2024);

		// 🧩 Inject dynamic data
		const hero = {
			...settings.hero.toObject(),
			stats: [
				{ icon: "FileText", number: `${blogCount}`, label: "Blogs Written" },
				{
					icon: "Briefcase",
					number: `${yearsOfExperience}+`,
					label: "Years Experience",
				},
				{ icon: "Clock", number: "Weekly", label: "New Content" },
			],
		};
		return JSON.parse(JSON.stringify({ ...settings.toObject(), hero }));
	} catch (error) {
		console.error("Failed to fetch site settings:", error);
		return null;
	}
}
