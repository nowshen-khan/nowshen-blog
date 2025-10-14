// components/hero/HeroContent.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, BookOpen } from "lucide-react";

interface HeroContentProps {
	data: {
		welcomeText: string;
		title: string;
		subtitle: string;
		description: string;
		expertise: string[];
		buttons: { label: string; href: string; order: number }[];
	};
}

export default function HeroContent({ data }: HeroContentProps) {
	const { welcomeText, title, subtitle, description, expertise, buttons } =
		data;

	// Sort Buttons by order
	const sortedButtons = [...buttons].sort(
		(a, b) => (a.order || 0) - (b.order || 0)
	);
	return (
		<div className="space-y-8">
			{/* Welcome Badge */}
			<div
				className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
				aria-label="Welcome message"
			>
				<BookOpen className="w-4 h-4" />
				<span>{welcomeText}</span>
			</div>

			{/* Main Heading with SEO focus */}
			<div className="space-y-6">
				<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
					<span className="block text-foreground">{title}</span>
					<span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
						{subtitle}
					</span>
				</h1>

				<p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
					{description}
				</p>
			</div>

			{/* Expertise Tags */}
			<div className="flex flex-wrap gap-3" aria-label="Areas of expertise">
				{expertise.map((skill) => (
					<span
						key={skill}
						className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full border"
					>
						{skill}
					</span>
				))}
			</div>

			{/* CTA Buttons */}
			<div className="flex flex-col sm:flex-row gap-4">
				{sortedButtons.map((button) => (
					<Button
						asChild
						size="lg"
						key={button.order}
						variant={button.order === 2 ? "outline" : "default"}
						className="group"
					>
						<Link href={button.href}>
							{button.label}
							{button.href.startsWith("/blog") ? (
								<ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
							) : (
								<Calendar className="w-4 h-4 ml-2" />
							)}
						</Link>
					</Button>
				))}
			</div>
		</div>
	);
}
