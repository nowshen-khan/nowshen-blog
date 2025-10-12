import connectDB from "./mongodb";
import SiteSettings from "@/models/SiteSettings";
import { Blog } from "@/models/Blog";

export async function getSiteSettings() {
	await connectDB();

	const settings = await SiteSettings.findOne();
	if (!settings) return null;

	const blogCount = await Blog.countDocuments({ isPublished: true });
	const yearsOfExperience =
		new Date().getFullYear() - (settings.hero?.startYear || 2024);

	// ✅ Dynamic stats added only in response
	const hero = {
		...settings.hero.toObject(),
		stats: [
			{ icon: "FileText", number: `${blogCount}+`, label: "Blogs Written" },
			{
				icon: "Briefcase",
				number: `${yearsOfExperience}+`,
				label: "Years Experience",
			},
			{ icon: "Clock", number: "Weekly", label: "New Content" },
		],
	};

	return JSON.parse(JSON.stringify({ ...settings.toObject(), hero }));
}
