import React from "react";
import about, { About } from "@/data/about";
import { Badge } from "@/components/ui/badge";
import {
	Award,
	Briefcase,
	Calendar,
	Github,
	Globe,
	Linkedin,
	Mail,
	Users,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
		isActive,
	} = about;

	const stats = [
		{ icon: Calendar, value: `${experience}+`, label: "Years Experience" },
		{ icon: Briefcase, value: `${projects}+`, label: "Projects Completed" },
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
			<section>
				<div>
					<div>
						<Badge>
							<Award />
							Professional Profile
						</Badge>
						<h1>{title}</h1>
						<p>{subtitle}</p>
					</div>
				</div>
			</section>

			{/* Main Section */}
			<section>
				<div>
					<div>
						{/* Left Column - Image & Stats */}
						<div>
							<Card>
								<CardContent>
									<div>
										<Image
											src={image}
											alt={imageAlt}
											width={400}
											height={400}
											priority
										/>
									</div>
								</CardContent>
							</Card>

							<Card>
								<CardContent>
									<h3>
										<Briefcase /> Professional Stats
									</h3>
									<div>
										{stats.map((stat, index) => (
											<div key={index}>
												<div>
													<stat.icon />
													<span>{stat.label}</span>
												</div>
												<span>{stat.value}</span>
											</div>
										))}
									</div>
								</CardContent>
							</Card>

							{links.length > 0 && (
								<Card>
									<CardContent>
										<h3>Connect With Me</h3>
										<div>
											{links.map((link, index) => (
												<Button key={index} asChild>
													<Link
														href={link.href}
														target="_blank"
														rel="noopener noreferrer"
													>
														<link.icon />
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
						{skills.length > 0 && (
							<Card>
								<CardContent>
									<h3>Skills & Technologies</h3>
									<div>
										{skills.map((skill, index) => (
											<Badge key={index}>{skill}</Badge>
										))}
									</div>
								</CardContent>
							</Card>
						)}
					</div>
				</div>
			</section>
		</div>
	);
};

export default AboutPage;
