// lib/site-settings.ts
import connectDB from "./mongodb";
import SiteSettings from "@/models/SiteSettings";
import { Blog } from "@/models/Blog";

export async function getSiteSettings() {
	try {
		await connectDB();

		let settings = await SiteSettings.findOne();

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
