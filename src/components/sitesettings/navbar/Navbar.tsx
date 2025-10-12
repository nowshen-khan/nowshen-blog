"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DesktopMenu, MobileMenu } from "./Menu";
import Logo from "@/components/sitesettings/Logo";

const navbar = {
	useImage: false,
	logoText: "Nowshen",
	logoImage: "/nowshenLogo.png",
	navLinks: [
		{
			href: "/",
			exact: true,
			order: 1,
			label: "Home",
		},
		{
			href: "/about",
			order: 2,
			label: "About",
		},
		{
			href: "/services",
			order: 3,
			label: "Services",
		},
		{
			href: "/blog",
			order: 4,
			label: "Blog",
		},
		{
			href: "/contact",
			order: 5,
			label: "Contact",
		},
	],
};

const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const pathname = usePathname();
	const { useImage, logoText, logoImage, navLinks } = navbar;
	const isLoggedIn = false; // test purpose, later replace with auth state

	// scroll effect
	useEffect(() => {
		const handleScroll = () => setIsScrolled(window.scrollY > 10);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// close mobile menu on route change
	useEffect(() => {
		setIsMobileMenuOpen(false);
	}, [pathname]);

	const isActive = (href: string, exact: boolean = false) => {
		if (!pathname) return false;
		if (exact) return pathname === href;
		return pathname.startsWith(href);
	};

	// Sort navLinks
	const sortedLinks = [...navLinks].sort(
		(a, b) => (a.order || 0) - (b.order || 0)
	);

	return (
		<nav
			className={cn(
				"flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 bg-background/80 backdrop-blur-md border-b sticky top-0 z-50 transition-all duration-300",
				isScrolled && "shadow-sm bg-background/95 py-2"
			)}
		>
			{/* Logo */}
			<Logo useImage={useImage} logoText={logoText} logoImage={logoImage} />

			{/* Desktop Menu */}
			<DesktopMenu
				pathname={pathname}
				isLoggedIn={isLoggedIn}
				isActive={isActive}
				navLinks={sortedLinks}
			/>

			{/* Mobile Menu */}
			<MobileMenu
				isMobileMenuOpen={isMobileMenuOpen}
				setIsMobileMenuOpen={setIsMobileMenuOpen}
				pathname={pathname}
				isLoggedIn={isLoggedIn}
				isActive={isActive}
				useImage={useImage}
				logoText={logoText}
				logoImage={logoImage}
				navLinks={sortedLinks}
			/>
		</nav>
	);
};

export default Navbar;
