// components/hero/HeroSection.tsx
import HeroContent from "@/components/hero/HeroContent";
import HeroBackground from "@/components/hero/HeroBackground";
import HeroStats from "@/components/hero/HeroStats";
import ScrollIndicator from "@/components/hero/ScrollIndicator";
import hero from "@/data/hero";

export default async function HeroSection() {
	const { stats, ...heroWithoutStats } = hero;
	return (
		<section
			aria-label="Welcome section"
			className="relative min-h-screen flex items-center justify-center overflow-hidden"
		>
			<HeroBackground />
			<div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid lg:grid-cols-2 gap-12 items-center">
					<HeroContent data={heroWithoutStats} />
					<HeroStats stats={stats} />
				</div>
			</div>
			{/* <ScrollIndicator /> */}
		</section>
	);
}
