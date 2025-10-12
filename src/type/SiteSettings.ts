export interface SiteSettingsType {
	siteName: string;
	title: string;
	description: string;
	hero: HeroSection;
	navbar: Navbar;
	footer: Footer;
}

export interface HeroSection {
	buttons: {
		primary: {
			text: string;
			href: string;
		};
		secondary: {
			text: string;
			href: string;
		};
	};
	startYear: number;
	welcomeText: string;
	title: string;
	subtitle: string;
	description: string;
	expertise: string[];
	stats: HeroStat[];
}

export interface HeroStat {
	icon: string; // could be typed as `keyof typeof lucideIcons` if you want strong typing
	number: string;
	label: string;
	_id: {
		$oid: string;
	};
}

export interface Navbar {
	useImage: boolean;
	logoText: string;
	logoImage: string;
	navLinks: NavLink[];
}

export interface NavLink {
	href: string;
	exact?: boolean;
	order: number;
	label: string;
	icon: string;
}

export interface Footer {
	brand: {
		useImage: boolean;
		logoText: string;
		logoImage: string;
		tagline: string;
	};
	columns: FooterColumn[];
	socialLinks: SocialLinks;
	location: string;
	copyright: string;
}

export interface FooterColumn {
	title: string;
	links: FooterLink[];
}

export interface FooterLink {
	label: string;
	href: string;
	order?: number;
}

export interface SocialLinks {
	facebook?: string;
	twitter?: string;
	github?: string;
	linkedin?: string;
	email?: string;
}
