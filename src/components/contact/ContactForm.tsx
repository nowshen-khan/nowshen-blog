"use client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { Alert, AlertDescription } from "../ui/alert";
import { CheckCircle, Loader2, Send } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { services } from "@/data/contact";

const ContactForm = () => {
	const searchParams = useSearchParams();
	const predefinedService = searchParams.get("subject");

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		subject: "",
		message: "",
		service: predefinedService || "",
	});

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>
	) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setError("");
		setSuccess("");

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to send message");
			}

			setSuccess(data.message);
			setTimeout(() => setSuccess(""), 5000);

			// Reset form
			setFormData({
				name: "",
				email: "",
				phone: "",
				subject: "",
				message: "",
				service: predefinedService || "",
			});
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError("An unexpected error occurred. Please try again.");
			}
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<form onSubmit={handleSubmit} className="space-y-6">
			{/* Form fields go here */}
			{error && (
				<Alert variant="destructive">
					<AlertDescription>{error}</AlertDescription>
				</Alert>
			)}

			{success && (
				<Alert className="bg-green-50 border-green-200">
					<CheckCircle className="h-4 w-4 text-green-600" />
					<AlertDescription className="text-green-800">
						{success}
					</AlertDescription>
				</Alert>
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="name">Full Name *</Label>
					<Input
						id="name"
						name="name"
						value={formData.name}
						onChange={handleChange}
						required
						disabled={isLoading}
						placeholder="Your full name"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="email">Email Address *</Label>
					<Input
						id="email"
						name="email"
						type="email"
						value={formData.email}
						onChange={handleChange}
						required
						disabled={isLoading}
						placeholder="your@email.com"
					/>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="space-y-2">
					<Label htmlFor="phone">Phone Number</Label>
					<Input
						id="phone"
						name="phone"
						type="tel"
						value={formData.phone}
						onChange={handleChange}
						disabled={isLoading}
						placeholder="Your phone number"
					/>
				</div>
				<div className="space-y-2">
					<Label htmlFor="service">Service Interest</Label>
					<select
						id="service"
						name="service"
						value={formData.service}
						onChange={handleChange}
						disabled={isLoading}
						className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 "
					>
						{services.map((service) => (
							<option
								key={service.value}
								value={service.value}
								disabled={service.value === ""}
							>
								{service.label}
							</option>
						))}
					</select>
				</div>
			</div>
			<div className="space-y-2">
				<Label htmlFor="subject">Subject *</Label>
				<Input
					id="subject"
					name="subject"
					value={formData.subject}
					onChange={handleChange}
					required
					disabled={isLoading}
					placeholder="What is this regarding?"
				/>
			</div>
			<div className="space-y-2">
				<Label htmlFor="message">Message *</Label>
				<Textarea
					id="message"
					name="message"
					value={formData.message}
					onChange={handleChange}
					required
					disabled={isLoading}
					placeholder="Tell us about your project or inquiry..."
					rows={6}
					className="resize-none"
				/>
			</div>
			<Button type="submit" disabled={isLoading} size="lg" className="w-full">
				{isLoading ? (
					<>
						<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						Sending Message...
					</>
				) : (
					<>
						<Send className="mr-2 h-4 w-4" /> Send Message
					</>
				)}
			</Button>

			<p className="text-xs text-muted-foreground text-center">
				By submitting this form, you agree to our privacy policy and terms of
				service.
			</p>
		</form>
	);
};

export default ContactForm;
