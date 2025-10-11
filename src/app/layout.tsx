import type { Metadata } from "next";
import "@/app/globals.css";
import Navbar from "@/components/sitesettings/navbar/Navbar";
import ThemeProviders from "@/components/providers/ThemeProviders";
import Footer from "@/components/sitesettings/Footer";
import { getSiteSettings } from "@/lib/site-settings";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
	title: "Nowshen Blog",
	description: "Personal professional blog by Nowshen",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const settings = await getSiteSettings();

	const navbar = settings?.navbar;
	const footer = settings?.footer;

	return (
		<html lang="en" suppressHydrationWarning>
			<body className="min-h-screen bg-background text-foreground antialiased">
				<ThemeProviders>
					<Navbar data={navbar} />
					<main>{children}</main>
					<Toaster />
					<Footer data={footer} />
				</ThemeProviders>
			</body>
		</html>
	);
}
