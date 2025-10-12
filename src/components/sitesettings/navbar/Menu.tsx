import { Menu, User, X } from "lucide-react";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/mode-toggle";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getIconComponent } from "@/lib/getIconComponent";
import Logo from "@/components/sitesettings/Logo";

interface DesktopMenuProps {
	pathname: string;
	isLoggedIn: boolean;
	isActive: (href: string, exact?: boolean) => boolean;
	navLinks: {
		label: string;
		href: string;
		exact?: boolean;
		order?: number;
		icon?: string;
	}[];
}

export const DesktopMenu = ({
	isLoggedIn,
	isActive,
	navLinks,
}: DesktopMenuProps) => {
	console.log(navLinks);
	return (
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
									{item.icon && (
										<span className="mr-2 text-muted-foreground">
											{getIconComponent(item.icon, { size: 16 })}
										</span>
									)}
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

			<div className="flex items-center gap-3 pl-2 border-l">
				{/* Theme toggle */}
				<ModeToggle />

				{/* Profile/Login Dropdown */}
				{isLoggedIn ? (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								className="relative h-9 w-9 rounded-full transition-all hover:scale-105"
							>
								<Avatar className="h-8 w-8">
									<AvatarImage src="/profile.jpg" alt="Profile" />
									<AvatarFallback className="bg-primary text-primary-foreground text-sm">
										<User className="w-4 h-4" />
									</AvatarFallback>
								</Avatar>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end" className="w-48">
							<DropdownMenuLabel className="flex items-center gap-2">
								<Avatar className="h-6 w-6">
									<AvatarImage src="/profile.jpg" alt="Profile" />
									<AvatarFallback>N</AvatarFallback>
								</Avatar>
								<div className="flex flex-col">
									<span className="text-sm font-semibold">Nowshen</span>
									<span className="text-xs text-muted-foreground">
										admin@nowshen.com
									</span>
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem asChild>
								<Link href="/profile" className="cursor-pointer">
									Profile
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link href="/dashboard" className="cursor-pointer">
									Dashboard
								</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link href="/settings" className="cursor-pointer">
									Settings
								</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer">
								Logout
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				) : (
					<div className="flex items-center gap-2">
						<Button asChild variant="ghost" size="sm">
							<Link href="/login">Sign In</Link>
						</Button>
						<Button asChild size="sm">
							<Link href="/register">Get Started</Link>
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

interface MobileMenuProps {
	isMobileMenuOpen: boolean;
	setIsMobileMenuOpen: (open: boolean) => void;
	pathname: string;
	isLoggedIn: boolean;
	isActive: (href: string, exact?: boolean) => boolean;
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
}

export const MobileMenu = ({
	isMobileMenuOpen,
	setIsMobileMenuOpen,
	isLoggedIn,
	isActive,
	navLinks,
	useImage,
	logoText,
	logoImage,
}: MobileMenuProps) => {
	return (
		<div className="flex md:hidden items-center gap-3">
			<ModeToggle />

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
					<div className="flex items-center justify-between pb-4 border-b">
						<Link
							href="/"
							className="flex items-center gap-2"
							onClick={() => setIsMobileMenuOpen(false)}
						>
							<Logo
								useImage={useImage}
								logoText={logoText}
								logoImage={logoImage}
							/>
							{/* <span className="font-bold text-lg bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
								Nowshen
							</span> */}
						</Link>
					</div>

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
									{item.icon && (
										<span className="mr-2 text-muted-foreground">
											{getIconComponent(item.icon, { size: 16 })}
										</span>
									)}
									{item.label}
								</Link>
							))}
						</nav>
					</div>

					{/* Mobile Menu Footer */}
					<div className="border-t pt-4 space-y-4">
						{isLoggedIn ? (
							<div className="space-y-3">
								<div className="flex items-center gap-3 px-4 py-2">
									<Avatar className="h-8 w-8">
										<AvatarImage src="/profile.jpg" alt="Profile" />
										<AvatarFallback>N</AvatarFallback>
									</Avatar>
									<div className="flex flex-col">
										<span className="text-sm font-semibold">Nowshen</span>
										<span className="text-xs text-muted-foreground">
											admin@nowshen.com
										</span>
									</div>
								</div>
								<div className="grid grid-cols-2 gap-2">
									<Button asChild variant="outline" size="sm">
										<Link
											href="/profile"
											onClick={() => setIsMobileMenuOpen(false)}
										>
											Profile
										</Link>
									</Button>
									<Button asChild variant="outline" size="sm">
										<Link
											href="/dashboard"
											onClick={() => setIsMobileMenuOpen(false)}
										>
											Dashboard
										</Link>
									</Button>
								</div>
								<Button variant="destructive" size="sm" className="w-full">
									Logout
								</Button>
							</div>
						) : (
							<div className="space-y-2">
								<Button asChild variant="outline" className="w-full">
									<Link
										href="/login"
										onClick={() => setIsMobileMenuOpen(false)}
									>
										Sign In
									</Link>
								</Button>
								<Button asChild className="w-full">
									<Link
										href="/register"
										onClick={() => setIsMobileMenuOpen(false)}
									>
										Get Started
									</Link>
								</Button>
							</div>
						)}
					</div>
				</SheetContent>
			</Sheet>
		</div>
	);
};
