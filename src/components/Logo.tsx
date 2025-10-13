import Link from "next/link";

interface LogoProps {
	logoText: string;
	footer: boolean;
}

export default function Logo({ logoText, footer }: LogoProps) {
	return (
		<>
			{footer ? (
				<Link href="/">
					<h2 className="text-xl font-bold mb-2">
						<span className="text-muted-foreground">
							{logoText.split(".")[0]}.
						</span>
						<span className="text-primary">{logoText.split(".")[1]}</span>
					</h2>
				</Link>
			) : (
				<Link className="flex items-center gap-2 group" href="/">
					<span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
						{logoText}
					</span>
				</Link>
			)}
		</>
	);
}
