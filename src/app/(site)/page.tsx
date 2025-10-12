import HeroSection from "@/components/hero/HeroSection";
import FeaturedArticles from "@/components/FeaturedArticles";
import RecentArticles from "@/components/RecentArticles";
import CTASection from "@/components/CTASection";
import BlogSection from "@/components/blog/BlogSection";
import { Metadata } from "next";
import { getSiteSettings } from "@/lib/site-settings";

const siteConfig = getSiteSettings();
export const metadata: Metadata = {
	title: siteConfig.title,
	description: siteConfig.description,
	keywords: [
		"web development",
		"react",
		"next.js",
		"javascript",
		"typescript",
		"programming blog",
	],
	authors: [{ name: siteConfig.author }],
	openGraph: {
		title: siteConfig.title,
		description: siteConfig.description,
		type: "website",
		siteName: siteConfig.name,
	},
	twitter: {
		card: "summary_large_image",
		creator: siteConfig.social.twitter,
	},
};

export default function HomePage() {
	return (
		<>
			<HeroSection />
			{/* Featured */}
			{/* <BlogSection title="🌟 Featured Articles" type="featured" limit={3} /> */}
			{/* Recent */}
			{/* <BlogSection title="📰 Latest Articles" type="recent" limit={4} /> */}
			{/* <RecentArticles /> */}
			{/* Category */}
			{/* <BlogSection title="🌿 Plant Blogs" type="category" value="guide" limit={6} /> */}
			{/* Tag */}
			{/* <BlogSection title="#Tailwind Tips" type="tag" value="tailwind" /> */}
			{/* Search */}
			{/* <BlogSection title="Search Results" type="search" value="nextjs" showViewAll={false} /> */}
			<FeaturedArticles />

			<CTASection />
		</>
	);
}
