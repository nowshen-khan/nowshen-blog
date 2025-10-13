"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
	initialSearch?: string;
	placeholder?: string;
	className?: string;
}

export default function SearchBar({
	initialSearch = "",
	placeholder = "Search...",
	className,
}: SearchBarProps) {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [searchQuery, setSearchQuery] = useState(initialSearch);
	const [isTyping, setIsTyping] = useState(false);

	// Debounce search functionality
	useEffect(() => {
		if (searchQuery === initialSearch) return;

		const timeoutId = setTimeout(() => {
			const params = new URLSearchParams(searchParams?.toString());

			if (searchQuery) {
				params.set("search", searchQuery);
			} else {
				params.delete("search");
			}
			params.delete("page"); // Reset to first page when searching

			router.push(`/blog?${params.toString()}`, { scroll: false });
			setIsTyping(false);
		}, 500); // 500ms debounce delay

		return () => clearTimeout(timeoutId);
	}, [searchQuery, router, searchParams, initialSearch]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
		setIsTyping(true);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// The useEffect will handle the navigation
	};

	return (
		<form onSubmit={handleSubmit} className={className}>
			<div className="relative">
				<Input
					type="search"
					placeholder={placeholder}
					value={searchQuery}
					onChange={handleChange}
					className="pr-10 transition-all duration-300 py-5"
				/>
				<Button
					type="submit"
					variant="ghost"
					size="sm"
					className="absolute right-0 top-0 h-full px-3"
				>
					<Search className={`h-4 w-4 ${isTyping ? "animate-pulse" : ""}`} />
				</Button>
			</div>
			{isTyping && (
				<div className="text-xs text-muted-foreground mt-2 animate-pulse">
					Searching...
				</div>
			)}
		</form>
	);
}
