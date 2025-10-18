import { Star } from "lucide-react";

const seo = {
	title: "Service - Nowshen Blog",
	description:
		"Explore the services offered by Nowshen, including web development, content creation, and digital marketing solutions tailored to your needs.",
	keywords: [
		"Nowshen",
		"Services",
		"Web Development",
		"Content Creation",
		"Digital Marketing",
		"SEO",
		"Blog Services",
	],
};

const services = [
	{
		_id: 1,
		title: "SEO Optimization",
		slug: "seo-optimization",
		description:
			"Improve your website's search engine rankings with our SEO services.",
		icon: "🔍",
		features: [
			"Keyword research",
			"On-page optimization",
			"Link building",
			"Monthly analytics report",
		],
		price: 3000,
		priceType: "monthly",
		duration: "Ongoing",
		isActive: false,
		order: 4,
		image: "/images/services/seo.jpg",
		seo: {
			metaTitle: "SEO Optimization",
			metaDescription:
				"Improve your website's search engine rankings with our SEO services.",
			keywords: ["SEO", "optimization", "ranking", "analytics"],
		},
	},
	{
		_id: {
			$oid: "68f34de9f594e812390129f6",
		},
		title: "Graphic Design",
		slug: "graphic-design",
		description:
			"Creative logo, banner, and social media post design that represents your brand.",
		icon: "🎨",
		features: [
			"Logo design (3 initial concepts)",
			"Banner and poster design",
			"Social media post pack",
		],
		price: 2000,
		priceType: "one-time",
		duration: "2-3 days",
		isActive: true,
		order: 3,
		image: "/images/services/graphic-design.jpg",
		seo: {
			metaTitle: "Graphic Design",
			metaDescription:
				"Creative logo, banner, and social media post design that represents your brand.",
			keywords: ["graphic design", "logo", "banner", "branding"],
		},
	},
	{
		_id: {
			$oid: "68f34de9f594e812390129f5",
		},
		title: "Digital Marketing",
		slug: "digital-marketing",
		description:
			"Boost your online visibility through social media, SEO, and paid campaigns.",
		icon: "📈",
		features: [
			"Social media marketing (Facebook, Instagram, TikTok)",
			"Google Ads & SEO optimization",
			"Monthly performance report",
		],
		price: 5000,
		priceType: "monthly",
		duration: "Ongoing",
		isActive: true,
		order: 2,
		image: "/images/services/digital-marketing.jpg",
		seo: {
			metaTitle: "Digital Marketing",
			metaDescription:
				"Boost your online visibility through social media, SEO, and paid campaigns.",
			keywords: ["digital marketing", "SEO", "social media", "ads"],
		},
	},
	{
		_id: {
			$oid: "68f34de9f594e812390129f4",
		},
		title: "Custom Website Development",
		slug: "website-design-development",
		description:
			"Professional responsive website design and development with SEO optimization.",
		icon: "💻",
		features: [
			"Responsive design for all devices",
			"SEO-friendly structure",
			"Custom CMS integration",
			"1 year free maintenance",
		],
		price: 15000,
		priceType: "one-time",
		duration: "10-20 days",
		isActive: true,
		order: 1,
		image: "/images/services/web-dev.jpg",
		seo: {
			metaTitle: "Website Design & Development",
			metaDescription:
				"Professional responsive website design and development with SEO optimization.",
			keywords: ["website", "design", "development", "SEO"],
		},
	},
];

export { seo, services };
