import React from "react";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import navbar from "@/data/navbar";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
	const { logoText, navLinks } = navbar;

	// Sort navLinks
	const sortedLinks = [...navLinks].sort(
		(a, b) => (a.order || 0) - (b.order || 0)
	);
	return (
		<nav
			className={cn(
				"flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 bg-background/80 backdrop-blur-md border-b sticky top-0 z-50 transition-all duration-300"
			)}
		>
			{/* Logo */}
			<Logo logoText={logoText} />

			{/* Desktop Menu */}
			<DesktopMenu navLinks={sortedLinks} />

			{/* Mobile Menu */}
			<MobileMenu logoText={logoText} navLinks={sortedLinks} />
		</nav>
	);
};

export default Navbar;
