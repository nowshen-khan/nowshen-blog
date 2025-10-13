export interface NavbarData {
	logoText: string;
	navLinks: NavLink[];
}
export interface NavLink {
	href: string;
	label: string;
	exact?: boolean;
	order?: number;
}
const navbar = {
	logoText: "Nowshen",
	navLinks: [
		{
			href: "/",
			exact: true,
			order: 1,
			label: "Home",
		},
		{
			href: "/blog",
			order: 2,
			label: "Blog",
		},
		{
			href: "/services",
			order: 3,
			label: "Services",
		},
		{
			href: "/about",
			order: 4,
			label: "About",
		},
		{
			href: "/contact",
			order: 5,
			label: "Contact",
		},
	],
};

export default navbar;
