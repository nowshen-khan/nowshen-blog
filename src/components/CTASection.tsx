"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail } from "lucide-react";

export default function CTA() {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState<string | null>(null);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setMessage(null);

		const res = await fetch("/api/newsletter", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email }),
		});

		const data = await res.json();

		if (res.ok) {
			setMessage("🎉 Subscribed successfully!");
			setEmail("");
		} else {
			setMessage(data.error || "Something went wrong.");
		}

		setLoading(false);
	};

	return (
		<section
			id="newsletter"
			className="py-20 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950"
		>
			<div className="max-w-3xl mx-auto text-center px-4">
				<h2 className="text-3xl md:text-4xl font-bold mb-4">
					Stay updated with my latest blogs & tutorials!
				</h2>
				<p className="text-gray-600 dark:text-gray-400 mb-8">
					Join my newsletter and never miss a post about web development & tech
					tips.
				</p>

				<Card className="shadow-lg border-none">
					<CardContent className="p-6">
						<form
							onSubmit={handleSubmit}
							className="flex flex-col sm:flex-row gap-3 items-center justify-center"
						>
							<div className="relative w-full sm:w-auto sm:flex-1 items-center">
								<Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
								<Input
									type="email"
									placeholder="Enter your email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									required
									className="pl-12 h-10"
								/>
							</div>
							<Button
								type="submit"
								disabled={loading}
								className="bg-blue-600 hover:bg-blue-700 text-white"
							>
								{loading ? "Submitting..." : "Subscribe"}
							</Button>
						</form>

						{message && (
							<p
								className={`mt-4 text-sm ${
									message.includes("🎉")
										? "text-green-600 dark:text-green-400"
										: "text-red-600 dark:text-red-400"
								}`}
							>
								{message}
							</p>
						)}
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
