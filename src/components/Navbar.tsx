import React from "react";
import { cn } from "@/lib/utils";
import Logo from "./Logo";
import navbar from "@/data/navbar";
import DesktopMenu from "./DesktopMenu";

const Navbar = () => {
	const { logoText, navLinks } = navbar;

	// Sort navLinks
	const sortedLinks = [...navLinks].sort(
		(a, b) => (a.order || 0) - (b.order || 0)
	);
	return (
		<nav
			className={cn(
				"flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3  backdrop-blur-md border-b sticky top-0 z-50 transition-all duration-300"
			)}
		>
			{/* Logo */}
			<Logo logoText={logoText} />

			{/* Desktop Menu */}
			<DesktopMenu
				// pathname={pathname}
				// isLoggedIn={isLoggedIn}
				// isActive={isActive}
				navLinks={sortedLinks}
			/>

			{/* Mobile Menu */}
			{/* <MobileMenu
				isMobileMenuOpen={isMobileMenuOpen}
				setIsMobileMenuOpen={setIsMobileMenuOpen}
				pathname={pathname}
				isLoggedIn={isLoggedIn}
				isActive={isActive}
				useImage={useImage}
				logoText={logoText}
				logoImage={logoImage}
				navLinks={sortedLinks}
			/> */}
		</nav>
	);
};

export default Navbar;
