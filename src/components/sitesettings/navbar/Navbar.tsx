"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { getIconComponent } from "@/lib/getIconComponent";
import { DesktopMenu } from "./Menu"; // তোমার DesktopMenu component
import { MobileMenu } from "./Menu"; // MobileMenu component
import Logo from "@/components/sitesettings/Logo";

interface NavbarProps {
	data: {
		useImage: boolean;
		logoText: string;
		logoImage: string;
		navLinks: {
			label: string;
			href: string;
			exact?: boolean;
			order?: number;
			icon?: string;
		}[];
	};
}

const Navbar = ({ data }: NavbarProps) => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const pathname = usePathname();
	const { useImage, logoText, logoImage, navLinks } = data;
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
		if (exact) return pathname === href;
		return pathname.startsWith(href);
	};

	// Sort navLinks
	const sortedLinks = [...navLinks].sort(
		(a, b) => (a.order || 0) - (b.order || 0)
	);

	// Map icon strings → React components
	const menuItems = sortedLinks.map((link) => ({
		label: link.label,
		href: link.href,
		icon: getIconComponent(link.icon, { size: 24, color: "dark" }),
	}));

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
				navLinks={sortedLinks.map((link) => ({
					...link,
					icon: getIconComponent(link.icon, { size: 18 }),
				}))}
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
				navLinks={sortedLinks.map((link) => ({
					...link,
					icon: getIconComponent(link.icon, { size: 18 }),
				}))}
			/>

			{/* CircleMenu for mobile/fun navigation */}
			{/* <div className="w-full h-full flex items-center justify-center">
				<CircleMenu items={menuItems} />
			</div> */}
		</nav>
	);
};

export default Navbar;
