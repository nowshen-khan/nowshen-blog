import React from "react";
import about from "@/data/about";
import { Badge } from "@/components/ui/badge";
import {
	Award,
	Calendar,
	Code,
	Github,
	Globe,
	Linkedin,
	Mail,
	Users,
	BarChart,
	FolderOpen,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";

export function generateMetadata(): Metadata {
	const { seo } = about;
	const { metaTitle, metaDescription, keywords, ogImage } = seo;

	return {
		title: metaTitle,
		description: metaDescription,
		keywords: keywords,
		openGraph: {
			title: metaTitle,
			description: metaDescription,
			images: [
				{
					url: ogImage,
					width: 1200,
					height: 630,
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

const AboutPage = () => {
	const {
		title,
		subtitle,
		content,
		image,
		imageAlt,
		experience,
		projects,
		clients,
		skills,
		socialLinks,
		seo,
	} = about;

	const stats = [
		{ icon: Calendar, value: `${experience}+`, label: "Years Experience" },
		{ icon: FolderOpen, value: `${projects}+`, label: "Projects Completed" },
		{ icon: Users, value: `${clients}+`, label: "Happy Clients" },
	];

	const links = [
		{ icon: Github, href: socialLinks.github, label: "Github" },
		{ icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn" },
		{
			icon: Mail,
			href: socialLinks.email ? `mailto:${socialLinks.email}` : "",
			label: "Email",
		},
		{ icon: Globe, href: socialLinks.website, label: "Website" },
	].filter((link) => link.href) as {
		icon: React.ComponentType<{ className?: string }>;
		href: string;
		label: string;
	}[];
	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<section className="relative py-10 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
				<div className="container mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto">
						<Badge variant="secondary" className="mb-4">
							<Award className="w-4 h-4 mr-2" />
							Professional Profile
						</Badge>
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
							{title}
						</h1>
						<p className="text-xl text-muted-foreground leading-relaxed">
							{subtitle}
						</p>
					</div>
				</div>
			</section>

			{/* Main Section */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
						{/* Left Column - Image & Stats */}
						<div className="lg:col-span-1 space-y-8">
							<Card className="overflow-hidden">
								<CardContent className="p-0">
									<div className="relative aspect-square">
										<Image
											src={image}
											alt={imageAlt}
											width={400}
											height={400}
											priority
											className="object-cover"
										/>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardContent className="p-6">
									<h3 className="font-semibold text-lg mb-4 flex items-center">
										<BarChart className="w-5 h-5 mr-2" /> Professional Stats
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

							{links.length > 0 && (
								<Card>
									<CardContent className="p-6">
										<h3 className="font-semibold text-lg mb-4">
											Connect With Me
										</h3>
										<div className="grid grid-cols-2 gap-2">
											{links.map((link, index) => (
												<Button
													key={index}
													variant={"outline"}
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
												__html: content
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
							{skills.length > 0 && (
								<Card>
									<CardContent className="p-8">
										<h3 className="font-semibold text-2xl mb-6 flex items-center">
											<Code className="w-6 h-6 mr-3" />
											Skills & Technologies
										</h3>
										<div className="flex flex-wrap gap-3">
											{skills.map((skill, index) => (
												<Badge
													className="px-4 py-2 text-sm font-medium bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
													variant="secondary"
													key={index}
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
										I&#39;m always open to new opportunities and creative ideas.
									</p>
									<div className="flex gap-4 justify-center">
										<Button
											size={"lg"}
											className="bg-slate-900 hover:bg-slate-800"
											asChild
										>
											<Link href={"/contact"}>Get In Touch</Link>
										</Button>
										<Button
											size={"lg"}
											variant="outline"
											className="text-slate-800 border-white hover:bg-gray-100 hover:text-slate-700"
											asChild
										>
											<Link href={"/blogs"}>Read My Blog</Link>
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
};

export default AboutPage;
