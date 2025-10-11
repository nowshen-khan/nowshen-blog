"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DesktopMenu } from "./Menu";
import { MobileMenu } from "./Menu";
import Image from "next/image";

interface NavbarProps {
	data: {
		logoText: string;
		navLinks: { name: string; href: string; exact: boolean }[];
	};
}

const Navbar = ({ data }: NavbarProps) => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const pathname = usePathname();
	const { logoText, navLinks } = data;
	const isLoggedIn = true; // test purpose (later replace with auth state)

	// Handle scroll effect
	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Close mobile menu when route changes
	useEffect(() => {
		setIsMobileMenuOpen(false);
	}, [pathname]);

	const isActive = (href: string, exact: boolean = false) => {
		if (exact) {
			return pathname === href;
		}
		return pathname.startsWith(href);
	};

	return (
		<nav
			className={cn(
				"flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 bg-background/800 backdrop-blur-md border-b sticky top-0 z-50 transition-all duration-300",
				isScrolled && "shadow-sm bg-background/95 py-2"
			)}
		>
			{/* Logo */}
			<Logo data={logoText} />

			{/* Desktop Menu */}
			<DesktopMenu
				pathname={pathname}
				isLoggedIn={isLoggedIn}
				isActive={isActive}
				navLinks={navLinks}
			/>

			{/* Mobile Menu */}
			<MobileMenu
				isMobileMenuOpen={isMobileMenuOpen}
				setIsMobileMenuOpen={setIsMobileMenuOpen}
				pathname={pathname}
				isLoggedIn={isLoggedIn}
				isActive={isActive}
				navLinks={navLinks}
			/>
		</nav>
	);
};

export default Navbar;

function Logo({ data }: NavbarProps) {
	const { logoText } = data;
	return (
		<Link className="flex items-center gap-2 group" href="/">
			<span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
				{logoText}
			</span>

			<Image
				src="/nowshenLogo.png"
				alt="Nowshen Logo"
				className="h-8 w-auto group-hover:scale-105 transition-all duration-300"
				width={100}
				height={100}
			/>
		</Link>
	);
}
