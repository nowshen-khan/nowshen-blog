import React from "react";
import { NavLink } from "@/data/navbar";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DesktopMenuProps {
	navLinks: NavLink[];
}

const DesktopMenu = ({ navLinks }: DesktopMenuProps) => {
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
											"hover:bg-accent hover:text-accent-foreground"
										)}
									>
										{item.label}
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
