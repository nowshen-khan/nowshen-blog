"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Home, ArrowRight, RotateCcw } from "lucide-react";
import SearchBar from "@/components/SearchBar";

const quickLinks = [
	{ name: "Blog", href: "/blog" },
	{ name: "About", href: "/about" },
	{ name: "Projects", href: "/projects" },
	{ name: "Contact", href: "/contact" },
];

export default function NotFoundClient() {
	const router = useRouter();

	const handleGoBack = () => {
		if (window.history.length > 1) {
			router.back();
		} else {
			router.push("/");
		}
	};

	return (
		<div className="min-h-screen bg-background flex items-center justify-center px-4">
			<div className="max-w-lg mx-auto text-center space-y-8">
				{/* Animated Header */}
				<div className="space-y-4">
					<div className="relative inline-block">
						<h1 className="text-8xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
							404
						</h1>
						<div className="absolute -inset-2 bg-gradient-to-r from-primary/20 to-purple-600/20 rounded-full blur-lg animate-pulse" />
					</div>
					<h2 className="text-2xl font-bold text-foreground">Page Not Found</h2>
					<p className="text-muted-foreground">
						The page you&apos;re looking for doesn&apos;t exist or has been
						moved.
					</p>
				</div>

				{/* Search Bar */}
				<SearchBar
					placeholder="Search for blogs, tutorials, or pages..."
					className="space-y-4"
				/>
				<p className="text-sm text-muted-foreground">
					Try searching for what you&apos;re looking for
				</p>

				{/* Action Buttons */}
				<div className="flex flex-col sm:flex-row gap-3 justify-center">
					<Button
						onClick={handleGoBack}
						variant="outline"
						className="flex items-center gap-2"
					>
						<RotateCcw className="w-4 h-4" />
						Go Back
					</Button>

					<Button asChild className="flex items-center gap-2">
						<Link href="/">
							<Home className="w-4 h-4" />
							Home Page
							<ArrowRight className="w-4 h-4" />
						</Link>
					</Button>
				</div>

				{/* Quick Links */}
				<div className="pt-6 border-t">
					<p className="text-sm text-muted-foreground mb-4">Popular Pages:</p>
					<div className="flex flex-wrap gap-2 justify-center">
						{quickLinks.map((link) => (
							<Link
								key={link.name}
								href={link.href}
								className="px-3 py-2 text-sm bg-secondary hover:bg-secondary/80 rounded-md transition-colors"
							>
								{link.name}
							</Link>
						))}
					</div>
				</div>

				{/* Error Details */}
				<details className="text-left bg-muted rounded-lg p-4">
					<summary className="cursor-pointer font-medium">
						Technical Details
					</summary>
					<div className="mt-2 space-y-2 text-sm text-muted-foreground">
						<p>
							<strong>Error Code:</strong> 404 Not Found
						</p>
						<p>
							<strong>Message:</strong> The requested resource could not be
							located
						</p>
						<p>
							<strong>Solution:</strong> Check the URL or use the search above
						</p>
					</div>
				</details>
			</div>
		</div>
	);
}
