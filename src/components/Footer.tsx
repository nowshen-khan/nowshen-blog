import React from "react";
import footer from "@/data/footer";
import { Mail, X, Facebook, Linkedin, Github, Heart } from "lucide-react";
import Link from "next/link";
import Logo from "@/components/Logo";
const Footer = () => {
	const { logoText, aboutText, columns, socialLinks, location, copyright } =
		footer;

	const socials = [
		{
			icon: <Mail size={18} />,
			href: socialLinks.email,
		},
		{
			icon: <X size={18} />,
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
				<div className="col-span-2">
					<Logo logoText={logoText} variant={"footer"} />

					<p className="text-sm text-muted-foreground mb-4">{aboutText}</p>
					<div className="flex items-center gap-3 text-muted-foreground">
						{socials.map((item, index) => (
							<Link key={index} href={item.href} className="hover:text-primary">
								{item.icon}
							</Link>
						))}
					</div>
				</div>

				{columns.map((column, index) => (
					<div key={index} className="items-center justify-center">
						<h4 className="font-semibold mb-3 text-sm uppercase tracking-wider">
							{column.title}
						</h4>
						<ul className="space-y-1 text-sm">
							{column.links.map((link, linkIndex) => (
								<li key={linkIndex}>
									<Link
										href={link.href}
										className=" text-muted-foreground hover:text-primary transition"
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</div>
				))}
			</div>

			<div className="border-t border-border py-4 text-sm text-muted-foreground flex flex-col md:flex-row items-center justify-between container">
				<p>{copyright}</p>
				<p className="flex items-center gap-1">
					Made by <span className="font-semibold">Nowshen</span>{" "}
					<Heart className="text-red-500 w-4 h-4" /> from {location}
				</p>
			</div>
		</footer>
	);
};

export default Footer;
