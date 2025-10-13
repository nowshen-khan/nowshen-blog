import "./globals.css";
import Navbar from "@/components/navbar/Navbar";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="min-h-screen bg-background text-foreground">
				<Navbar />
				<main>{children}</main>
			</body>
		</html>
	);
}
