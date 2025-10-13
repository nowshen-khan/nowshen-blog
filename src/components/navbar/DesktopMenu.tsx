"use client";
import React from "react";
import { NavLink } from "@/data/navbar";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

interface DesktopMenuProps {
	navLinks: NavLink[];
}

const DesktopMenu = ({ navLinks }: DesktopMenuProps) => {
	const pathname = usePathname();
	const isActive = (href: string, exact: boolean = false) => {
		if (!pathname) return false;
		if (exact) return pathname === href;
		return pathname.startsWith(href);
	};
	return (
		<>
			<div className="hidden md:flex items-center gap-6">
				<NavigationMenu>
					<NavigationMenuList className="flex gap-1">
						{navLinks.map((item, index) => (
							<NavigationMenuItem key={index}>
								<NavigationMenuLink asChild>
									<Link
										href={item.href}
										className={cn(
											"px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 relative",
											"hover:bg-accent hover:text-accent-foreground",
											isActive(item.href, item.exact)
												? "text-primary font-semibold"
												: "text-foreground/80"
										)}
									>
										{item.label}
										{isActive(item.href, item.exact) && (
											<div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full transition-all duration-200" />
										)}
									</Link>
								</NavigationMenuLink>
							</NavigationMenuItem>
						))}
					</NavigationMenuList>
				</NavigationMenu>

				<div className="flex items-center gap-2 pl-2 border-l">
					<Button asChild variant="ghost" size="sm">
						<Link href="/login">Sign In</Link>
					</Button>
					<Button asChild size="sm">
						<Link href="#newsletter">Get Started</Link>
					</Button>
				</div>
			</div>
		</>
	);
};

export default DesktopMenu;
