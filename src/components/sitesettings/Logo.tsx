import Link from "next/link";
import Image from "next/image";

// Logo component
interface LogoProps {
	useImage: boolean;
	logoText: string;
	logoImage: string;
}

export default function Logo({ useImage, logoText, logoImage }: LogoProps) {
	return (
		<Link className="flex items-center gap-2 group" href="/">
			{useImage ? (
				<Image
					src={logoImage}
					alt="Logo"
					priority
					className="h-8 w-auto group-hover:scale-105 transition-all duration-300"
					width={100}
					height={100}
				/>
			) : (
				<span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
					{logoText}
				</span>
			)}
		</Link>
	);
}
