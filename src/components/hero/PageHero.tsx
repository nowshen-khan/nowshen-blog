import { Badge } from "@/components/ui/badge";

interface PageHeroProps {
	title: string;
	subtitle?: string;
	badgeText?: string;
	badgeIcon?: React.ReactNode;
	backgroundImage?: string;
}

const PageHero = ({
	badgeIcon,
	badgeText,
	title,
	subtitle,
	backgroundImage,
}: PageHeroProps) => (
	<section
		className="relative py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800"
		style={{
			backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
		}}
	>
		<div className="container mx-auto px-4">
			<div className="text-center max-w-3xl mx-auto">
				{badgeText && (
					<Badge variant="secondary" className="mb-4">
						{badgeIcon}
						{badgeText}
					</Badge>
				)}
				<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
					{title}
				</h1>
				{subtitle && (
					<p className="text-xl text-muted-foreground leading-relaxed">
						{subtitle}
					</p>
				)}
			</div>
		</div>
	</section>
);

export default PageHero;
