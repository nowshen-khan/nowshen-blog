import type { Metadata } from "next";
import "@/app/globals.css";
import Navbar from "@/components/sitesettings/navbar/Navbar";
import ThemeProviders from "@/components/providers/ThemeProviders";
import Footer from "@/components/sitesettings/Footer";
import { getSiteSettings } from "@/lib/site-settings";
import { Toaster } from "@/components/ui/sonner";

export async function generateMetadata() {
	const settings = await getSiteSettings();

	if (!settings) return { title: "Nowshen Blog", description: "Personal Blog" };

	return {
		title: settings.title,
		description: settings.description,
		openGraph: {
			title: settings.title,
			description: settings.description,
			url: "https://nowshen.com",
			siteName: settings.siteName,
		},
		twitter: {
			card: "summary_large_image",
			title: settings.title,
			description: settings.description,
		},
	};
}

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
					{navbar && <Navbar data={navbar} />}
					<main>{children}</main>
					<Toaster />
					{footer && <Footer data={footer} />}
				</ThemeProviders>
			</body>
		</html>
	);
}
