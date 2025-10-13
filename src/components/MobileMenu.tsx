"use client";
import { NavLink } from "@/data/navbar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
interface MobileMenuProps {
	logoText: string;
	navLinks: NavLink[];
}

const MobileMenu = ({ logoText, navLinks }: MobileMenuProps) => {
	const pathname = usePathname();
	const isActive = (href: string, exact: boolean = false) => {
		if (!pathname) return false;
		if (exact) return pathname === href;
		return pathname.startsWith(href);
	};

	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	return (
		<div className="flex md:hidden items-center gap-3">
			<Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
				<SheetTrigger asChild>
					<Button variant="ghost" size="sm" className="relative h-9 w-9 p-0">
						{isMobileMenuOpen ? (
							<X className="h-5 w-5" />
						) : (
							<Menu className="h-5 w-5" />
						)}
					</Button>
				</SheetTrigger>
				<SheetContent
					side="right"
					className="flex flex-col w-[85vw] max-w-sm sm:max-w-md"
				>
					{/* Mobile Menu Header */}

					<Link
						href="/"
						className="flex items-center gap-2 justify-between p-4 border-b"
						onClick={() => setIsMobileMenuOpen(false)}
					>
						<Logo logoText={logoText} />
					</Link>

					{/* Mobile Menu Items */}
					<div className="flex-1 py-6">
						<nav className="grid gap-2">
							{navLinks.map((item, index) => (
								<Link
									style={{ transitionDelay: `${index * 40}ms` }}
									key={index}
									href={item.href}
									className={cn(
										"flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-200",
										"hover:bg-accent hover:text-accent-foreground",
										isActive(item.href, item.exact)
											? "bg-accent text-accent-foreground font-semibold"
											: "text-foreground/80"
									)}
									onClick={() => setIsMobileMenuOpen(false)}
								>
									{item.label}
								</Link>
							))}
						</nav>
					</div>

					{/* Mobile Menu Footer */}
					<div className="border-tspace-y-4 pb-2">
						<div className="space-y-2">
							<Button asChild variant="outline" className="w-full">
								<Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
									Sign In
								</Link>
							</Button>
							<Button asChild className="w-full">
								<Link
									href="#newsletter"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									Get Started
								</Link>
							</Button>
						</div>
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
};

export default MobileMenu;
