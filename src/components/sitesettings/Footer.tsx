import Link from "next/link";
import { Mail, Twitter, Linkedin, Github, Heart, Facebook } from "lucide-react";
import Logo from "@/components/sitesettings/Logo";

const footer = {
	brand: {
		useImage: false,
		logoText: "blog.Nowshen",
		logoImage: "/logoNowshen.png",
		tagline: "Digital insights by Nowshen Anjuman Khan",
	},
	columns: [
		{
			title: "Category",
			links: [
				{ label: "CSS", href: "/category/css", order: 1 },
				{ label: "JavaScript", href: "/category/javascript", order: 2 },
				{ label: "Tailwind", href: "/category/tailwind", order: 3 },
				{ label: "React JS", href: "/category/react", order: 4 },
				{ label: "More Category", href: "/categories", order: 5 },
			],
		},
		{
			title: "About Me",
			links: [
				{ label: "About", href: "/about", order: 1 },
				{ label: "Projects", href: "/projects", order: 2 },
				{ label: "Achievements", href: "/achievements", order: 3 },
			],
		},
		{
			title: "Follow Us",
			links: [
				{ label: "Medium", href: "https://medium.com", order: 1 },
				{ label: "Instagram", href: "https://instagram.com", order: 2 },
				{ label: "Twitter", href: "https://twitter.com", order: 3 },
				{ label: "Facebook", href: "https://facebook.com", order: 4 },
			],
		},
		{
			title: "Terms and Conditions",
			links: [
				{ label: "Privacy Policy", href: "/privacy" },
				{ label: "Terms and Conditions", href: "/terms" },
			],
		},
	],
	socialLinks: {
		facebook: "https://facebook.com/nowshen",
		twitter: "https://twitter.com/nowshen",
		github: "https://github.com/nowshen",
		linkedin: "https://linkedin.com/in/nowshen",
		email: "hello@nowshen.com",
	},
	location: "Gazipur, Bangladesh",
	copyright: "© 2025 blog.Nowshen",
};

export default function Footer() {
	const { brand, columns, socialLinks, location, copyright } = footer;
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
			icon: <Linkedin size={18} />,
			href: socialLinks.linkedin,
		},
		{
			icon: <Github size={18} />,
			href: socialLinks.github,
		},
	].filter((s) => s.href);

	return (
		<footer className="border-t border-border mt-10 px-6">
			<div className="container py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4 px-10">
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
							{col.links.map((link) => (
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
