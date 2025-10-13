import Link from "next/link";

interface LogoProps {
	logoText: string;
}

export default function Logo({ logoText }: LogoProps) {
	return (
		<Link className="flex items-center gap-2 group" href="/">
			<span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
				{logoText}
			</span>
		</Link>
	);
}
