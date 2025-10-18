import { Metadata } from "next";
import Link from "next/link";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Star, ArrowRight } from "lucide-react";
// import connectDB from "@/lib/mongodb";
// import { Service } from "@/models/Service";
import PageHero from "@/components/hero/PageHero";
import { seo, services } from "@/data/service";

export const metadata: Metadata = {
	title: seo.title,
	description: seo.description,
	keywords: seo.keywords,
};

export default async function ServicesPage() {
	//await connectDB();
	//const services = await Service.find({ isActive: true }).sort({ order: 1 });

	const formatPrice = (price: number, type: string) => {
		if (type === "free") return "Free";
		if (type === "one-time") return `৳${price}`;
		if (type === "monthly") return `৳${price}/month`;
		if (type === "yearly") return `৳${price}/year`;
		return `৳${price}`;
	};

	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<PageHero
				badgeIcon={<Star className="w-4 h-4 mr-2" />}
				badgeText="Our Services"
				title="Professional Services"
				subtitle="We offer comprehensive solutions to help your business grow and succeed in the digital world."
			/>

			{/* Services Grid */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					{services.length === 0 ? (
						<div className="text-center py-12">
							<div className="text-6xl mb-4">🛠️</div>
							<h2 className="text-2xl font-bold mb-4">No Services Available</h2>
							<p className="text-muted-foreground mb-6">
								We&#39;re currently updating our service offerings. Please check
								back soon!
							</p>
						</div>
					) : (
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{services.map((service, index) => (
								<Card
									key={service._id.toString()}
									className={`group hover:shadow-lg transition-all duration-300 ${
										index % 3 === 1
											? "lg:transform lg:scale-105 relative z-10 border-primary/20"
											: ""
									}`}
								>
									<CardHeader className="text-center pb-4">
										<div className="text-4xl mb-4">{service.icon}</div>
										<CardTitle className="text-xl">{service.title}</CardTitle>
										<CardDescription className="text-sm min-h-[40px]">
											{service.description}
										</CardDescription>
									</CardHeader>

									<CardContent className="space-y-6">
										{/* Pricing */}
										<div className="text-center">
											<div className="text-3xl font-bold text-primary">
												{formatPrice(service.price || 0, service.priceType)}
											</div>
											{service.duration && (
												<div className="text-sm text-muted-foreground mt-1">
													{service.duration}
												</div>
											)}
										</div>

										{/* Features */}
										<div className="space-y-3">
											<h4 className="font-semibold text-sm text-center">
												What&#39;s Included:
											</h4>
											<ul className="space-y-2">
												{service.features.map((feature, featureIndex) => (
													<li
														key={featureIndex}
														className="flex items-center text-sm"
													>
														<Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
														<span>{feature}</span>
													</li>
												))}
											</ul>
										</div>

										{/* CTA Button */}
										<Button
											asChild
											className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
										>
											<Link href={`/contact?service=${service.slug}`}>
												Get Started
												<ArrowRight className="ml-2 h-4 w-4" />
											</Link>
										</Button>
									</CardContent>
								</Card>
							))}
						</div>
					)}
				</div>
			</section>
			{/* CTA Section */}
			<section className="py-16 bg-slate-50 dark:bg-slate-900">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
					<p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
						Let&#39;s discuss your project and find the perfect solution for
						your needs.
					</p>
					<div className="flex flex-col sm:flex-row gap-4 justify-center">
						<Button size="lg" asChild>
							<Link href="/contact">Get Free Consultation</Link>
						</Button>
						<Button size="lg" variant="outline" asChild>
							<Link href="/about">Learn More About Us</Link>
						</Button>
					</div>
				</div>
			</section>
		</div>
	);
}
