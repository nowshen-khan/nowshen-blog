// components/hero/HeroBackground.tsx
export default function HeroBackground() {
	return (
		<div
			className="absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800"
			aria-hidden="true"
		>
			{/* Subtle background pattern for texture */}
			<div
				className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] "
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
				}}
			/>
		</div>
	);
}
