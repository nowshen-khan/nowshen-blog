import { Metadata } from "next";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Calendar,
	Briefcase,
	Users,
	Github,
	Linkedin,
	Mail,
	Globe,
	Award,
	Code,
} from "lucide-react";
import connectDB from "@/lib/mongodb";
import { About } from "@/models/About";
import Link from "next/link";

interface AboutSEO {
	metaTitle?: string;
	metaDescription?: string;
	keywords?: string[];
	ogImage?: string;
}

interface SocialLinks {
	github?: string;
	linkedin?: string;
	email?: string;
	website?: string;
}

interface AboutData {
	title?: string;
	subtitle?: string;
	content?: string;
	image?: string;
	imageAlt?: string;
	experience?: number;
	projects?: number;
	clients?: number;
	skills?: string[];
	socialLinks?: SocialLinks;
	seo?: AboutSEO;
}

export async function generateMetadata(): Promise<Metadata> {
	await connectDB();

	let about: AboutData | null = null;

	try {
		about = await About.getAboutPage();
	} catch (error) {
		console.error("Failed to fetch about page:", error);
		return {
			title: "About Me - Professional Profile",
			description:
				"Learn about my professional journey, skills, and experience.",
		};
	}

	const metaTitle =
		about?.seo?.metaTitle || about?.title || "About Me - Professional Profile";
	const metaDescription =
		about?.seo?.metaDescription ||
		about?.subtitle ||
		"Learn about my professional journey, skills, and experience.";
	const keywords = about?.seo?.keywords || [
		"developer",
		"professional",
		"about",
	];
	const ogImage = about?.seo?.ogImage || about?.image || "/og-about.jpg";

	return {
		title: metaTitle,
		description: metaDescription,
		keywords,
		openGraph: {
			title: metaTitle,
			description: metaDescription,
			type: "profile",
			images: [
				{
					url: ogImage,
					width: 1200,
					height: 630,
					alt: about?.imageAlt || "Professional portrait",
				},
			],
		},
		twitter: {
			card: "summary_large_image",
			title: metaTitle,
			description: metaDescription,
			images: [ogImage],
		},
	};
}

export default async function AboutPage() {
	await connectDB();

	let about: AboutData | null = null;

	try {
		about = await About.getAboutPage();
	} catch (error) {
		console.error("Failed to fetch about page:", error);
		return (
			<div className="min-h-screen bg-background flex items-center justify-center">
				<div className="text-center">
					<h1 className="text-2xl font-bold mb-4">About Page</h1>
					<p className="text-muted-foreground">
						The about page content is currently unavailable. Please check back
						later.
					</p>
				</div>
			</div>
		);
	}

	const safeAbout: Required<AboutData> = {
		title: about?.title || "About Me",
		subtitle:
			about?.subtitle || "Professional Developer & Technology Enthusiast",
		content:
			about?.content ||
			"I am a passionate professional with expertise in various technologies. I love creating meaningful solutions and sharing knowledge through my work.",
		image: about?.image || "/hero-portrait.png",
		imageAlt: about?.imageAlt || "Professional portrait",
		experience: about?.experience || 0,
		projects: about?.projects || 0,
		clients: about?.clients || 0,
		skills: about?.skills || ["JavaScript", "TypeScript", "React", "Next.js"],
		socialLinks: about?.socialLinks || {},
		seo: about?.seo || {
			metaTitle: "",
			metaDescription: "",
			keywords: [],
			ogImage: "",
		},
	};

	const stats = [
		{
			icon: Calendar,
			value: `${safeAbout.experience}+`,
			label: "Years Experience",
		},
		{
			icon: Briefcase,
			value: `${safeAbout.projects}+`,
			label: "Projects Completed",
		},
		{
			icon: Users,
			value: `${safeAbout.clients}+`,
			label: "Happy Clients",
		},
	] as const;

	const socialLinks = [
		{
			icon: Github,
			href: safeAbout.socialLinks.github,
			label: "GitHub",
		},
		{
			icon: Linkedin,
			href: safeAbout.socialLinks.linkedin,
			label: "LinkedIn",
		},
		{
			icon: Mail,
			href: safeAbout.socialLinks.email
				? `mailto:${safeAbout.socialLinks.email}`
				: "",
			label: "Email",
		},
		{
			icon: Globe,
			href: safeAbout.socialLinks.website,
			label: "Website",
		},
	].filter((link) => link.href) as {
		icon: React.ComponentType<{ className?: string }>;
		href: string;
		label: string;
	}[];

	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<section className="relative py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
				<div className="container mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto">
						<Badge variant="secondary" className="mb-4">
							<Award className="w-4 h-4 mr-2" />
							Professional Profile
						</Badge>
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
							{safeAbout.title}
						</h1>
						<p className="text-xl text-muted-foreground leading-relaxed">
							{safeAbout.subtitle}
						</p>
					</div>
				</div>
			</section>

			{/* Main Content */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
						{/* Left Column - Image & Stats */}
						<div className="lg:col-span-1 space-y-8">
							<Card className="overflow-hidden">
								<CardContent className="p-0">
									<div className="relative aspect-square">
										<Image
											src={safeAbout.image}
											alt={safeAbout.imageAlt}
											width={1000}
											height={1000}
											className="object-cover"
											priority
										/>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardContent className="p-6">
									<h3 className="font-semibold text-lg mb-4 flex items-center">
										<Briefcase className="w-5 h-5 mr-2" />
										Professional Stats
									</h3>
									<div className="space-y-4">
										{stats.map((stat, index) => (
											<div
												key={index}
												className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
											>
												<div className="flex items-center">
													<stat.icon className="w-4 h-4 mr-3 text-muted-foreground" />
													<span className="text-sm font-medium">
														{stat.label}
													</span>
												</div>
												<span className="font-bold text-lg">{stat.value}</span>
											</div>
										))}
									</div>
								</CardContent>
							</Card>

							{socialLinks.length > 0 && (
								<Card>
									<CardContent className="p-6">
										<h3 className="font-semibold text-lg mb-4">
											Connect With Me
										</h3>
										<div className="grid grid-cols-2 gap-2">
											{socialLinks.map((link, index) => (
												<Button
													key={index}
													variant="outline"
													className="justify-start h-auto py-3"
													asChild
												>
													<Link
														href={link.href}
														target="_blank"
														rel="noopener noreferrer"
													>
														<link.icon className="w-4 h-4 mr-2" />
														{link.label}
													</Link>
												</Button>
											))}
										</div>
									</CardContent>
								</Card>
							)}
						</div>

						{/* Right Column - Content & Skills */}
						<div className="lg:col-span-2 space-y-8">
							<Card>
								<CardContent className="p-8">
									<div className="prose prose-slate dark:prose-invert max-w-none">
										<div
											className="whitespace-pre-line text-lg leading-relaxed text-slate-700 dark:text-slate-300"
											dangerouslySetInnerHTML={{
												__html: safeAbout.content
													.split("\n\n")
													.map(
														(paragraph) =>
															`<p class="mb-6 last:mb-0">${paragraph.replace(
																/\n/g,
																"<br/>"
															)}</p>`
													)
													.join(""),
											}}
										/>
									</div>
								</CardContent>
							</Card>

							{safeAbout.skills.length > 0 && (
								<Card>
									<CardContent className="p-8">
										<h3 className="font-semibold text-2xl mb-6 flex items-center">
											<Code className="w-6 h-6 mr-3" />
											Skills & Technologies
										</h3>
										<div className="flex flex-wrap gap-3">
											{safeAbout.skills.map((skill, index) => (
												<Badge
													key={index}
													variant="secondary"
													className="px-4 py-2 text-sm font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
												>
													{skill}
												</Badge>
											))}
										</div>
									</CardContent>
								</Card>
							)}

							<Card className="bg-gradient-to-r from-slate-900 to-slate-700 text-white">
								<CardContent className="p-8 text-center">
									<h3 className="text-2xl font-bold mb-4">
										Let&#39;s Work Together
									</h3>
									<p className="text-slate-300 mb-6 max-w-2xl mx-auto">
										Interested in collaborating or have a project in mind?
										I&#39;m always open to discussing new opportunities and
										creative ideas.
									</p>
									<div className="flex gap-4 justify-center">
										<Button size="lg" asChild>
											<Link href="/contact">Get In Touch</Link>
										</Button>
										<Button
											size="lg"
											variant="outline"
											className="text-white border-white hover:bg-white hover:text-slate-900"
											asChild
										>
											<Link href="/blog">Read My Blog</Link>
										</Button>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
