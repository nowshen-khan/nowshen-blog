import Link from "next/link";
import Image from "next/image";
import {
	Mail,
	Twitter,
	Instagram,
	Linkedin,
	Github,
	Heart,
	Facebook,
} from "lucide-react";
import Logo from "@/components/sitesettings/Logo";
import { use } from "react";

interface FooterLink {
	label: string;
	href: string;
	order?: number;
}

interface FooterColumn {
	title: string;
	links: FooterLink[];
}

interface FooterData {
	brand: {
		useImage: boolean;
		logoText: string;
		logoImage: string;
		tagline: string;
	};
	columns: FooterColumn[];
	socialLinks: {
		facebook?: string;
		twitter?: string;
		github?: string;
		instagram?: string;
		linkedin?: string;
		email?: string;
	};
	location: string;
	copyright: string;
}

interface FooterProps {
	data: FooterData;
}

export default function Footer({ data }: FooterProps) {
	const { brand, columns, socialLinks, location, copyright } = data;
	const { useImage, logoText, logoImage } = brand;
	const socials = [
		{
			icon: <Mail size={18} />,
			href: socialLinks.email,
		},
		{
			icon: <Twitter size={18} />,
			href: socialLinks.twitter,
		},
		{
			icon: <Facebook size={18} />,
			href: socialLinks.facebook,
		},
		{
			icon: <Instagram size={18} />,
			href: socialLinks.instragram,
		},
		{
			icon: <Linkedin size={18} />,
			href: socialLinks.linkedin,
		},
		{
			icon: <Github size={18} />,
			href: socialLinks.github,
		},
	].filter((s) => s.href);

	return (
		<footer className="border-t border-border bg-background mt-10 px-6">
			<div className="container py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-4 px-10">
				{/* Brand Section */}
				<div className="col-span-2">
					<Link href="/">
						{useImage ? (
							<Logo
								useImage={useImage}
								logoText={brand.logoText}
								logoImage={brand.logoImage}
							/>
						) : (
							<>
								<h2 className="text-xl font-bold mb-2">
									<span className="text-muted-foreground">
										{brand.logoText.split(".")[0]}.
									</span>
									<span className="text-primary">
										{brand.logoText.split(".")[1]}
									</span>
								</h2>
							</>
						)}
					</Link>

					<p className="text-sm text-muted-foreground mb-4">{brand.tagline}</p>
					<div className="flex items-center gap-3 text-muted-foreground">
						{socials.map((item, index) => (
							<Link key={index} href={item.href} className="hover:text-primary">
								{item.icon}
							</Link>
						))}
					</div>
				</div>

				{/* Dynamic Columns */}
				{columns.map((col) => (
					<div key={col.title} className="items-center justify-center">
						<h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">
							{col.title}
						</h4>
						<ul className="space-y-1 text-sm">
							{col.links
								.sort((a, b) => (a.order || 0) - (b.order || 0))
								.map((link) => (
									<li key={link.label}>
										<Link
											href={link.href}
											className="text-muted-foreground hover:text-primary transition"
										>
											{link.label}
										</Link>
									</li>
								))}
						</ul>
					</div>
				))}
			</div>

			{/* Bottom Section */}
			<div className="border-t border-border py-4 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between container">
				<p>{copyright}</p>
				<p className="flex items-center gap-1">
					Made by{" "}
					<span className="font-semibold">{brand.logoText.split(".")[1]}</span>{" "}
					<Heart className="text-red-500 w-4 h-4" /> from {location}
				</p>
			</div>
		</footer>
	);
}
