import React from "react";
import contactInfo, { seo, socialLinks, faqs } from "@/data/contact";
import { Metadata } from "next";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/contact/ContactForm";

export function generateMetadata(): Metadata {
	const { title, description, keywords } = seo;
	return {
		title: title,
		description: description,
		keywords: keywords,
	};
}

const ContactPage = () => {
	return (
		<div className="min-h-screen bg-background">
			{/* Hero Section */}
			<section className="relative py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
				<div className="container mx-auto px-4">
					<div className="text-center max-w-3xl mx-auto">
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
							Get In Touch
						</h1>
						<p className="text-xl text-muted-foreground leading-relaxed">
							Have a project in mind or want to learn more about our services?
							We&#39;d love to hear from you and discuss how we can help bring
							your ideas to life.
						</p>
					</div>
				</div>
			</section>

			{/* Contact Section */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
						{/* Contact Information */}
						<div className="lg:col-span-1 space-y-6">
							<div>
								<h2 className="text-2xl font-bold mb-4">Let&#39;s Talk</h2>
								<p className="text-muted-foreground mb-8">
									We&#39;re here to answer any questions you may have about our
									services. Reach out to us and we&#39;ll respond as soon as we
									can.
								</p>
							</div>
							{/* Contact Details */}
							<div className="space-y-4">
								{contactInfo.map((item, index) => (
									<Card
										key={index}
										className="hover:shadow-md transition-shadow"
									>
										<CardContent className="p-4">
											<div className="flex items-start space-x-4">
												<div className="bg-primary/10 p-2 rounded-lg">
													<item.icon className="h-5 w-5 text-primary" />
												</div>
												<div className="flex-1">
													<h3 className="font-semibold text-sm mb-1">
														{item.title}
													</h3>
													<p className="text-xs text-muted-foreground mb-2">
														{item.description}
													</p>
													{item.link !== "#" ? (
														<Link
															href={item.link}
															className="text-sm text-primary hover:underline font-medium"
														>
															{item.value}
														</Link>
													) : (
														<span className="text-sm font-medium">
															{item.value}
														</span>
													)}
												</div>
											</div>
										</CardContent>
									</Card>
								))}
							</div>

							{/* Social Links */}
							<Card>
								<CardHeader>
									<CardTitle className="text-lg">Follow Us</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="flex space-x-4">
										{socialLinks.map((social, index) => (
											<Button key={index} variant="outline" size="sm" asChild>
												<Link
													href={social.url}
													target="_blank"
													rel="noopener noreferrer"
												>
													{social.name}
												</Link>
											</Button>
										))}
									</div>
								</CardContent>
							</Card>
						</div>

						{/* Contact Form */}
						<div className="lg:col-span-2">
							<Card>
								<CardHeader>
									<CardTitle>Send us a message</CardTitle>
									<CardDescription>
										Fill out the form below and we&#39;ll get back to you within
										24 hours.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<ContactForm />
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</section>

			{/* FAQ Section */}
			<section className="py-16 bg-slate-50 dark:bg-slate-900">
				<div className="container mx-auto px-4">
					<div className="text-center max-w-2xl mx-auto mb-12">
						<h2 className="text-3xl font-bold mb-4">
							Frequently Asked Questions
						</h2>
						<p className="text-muted-foreground">
							Can&#39;t find the answer you&#39;re looking for? Reach out to our
							customer support team.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
						{faqs.map((faq, index) => (
							<Card key={index}>
								<CardContent className="p-6">
									<h3 className="font-semibold mb-2">{faq.question}</h3>
									<p className="text-sm text-muted-foreground">{faq.answer}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>
		</div>
	);
};

export default ContactPage;
