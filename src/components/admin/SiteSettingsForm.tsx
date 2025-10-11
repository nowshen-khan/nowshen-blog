"use client";

import { useState, useEffect } from "react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "../ui/label";
import { toast } from "sonner";

export default function SiteSettingsForm() {
	const { settings, loading, updateSettings } = useSiteSettings();
	const [formData, setFormData] = useState<any>({});
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		if (settings) setFormData(settings);
	}, [settings]);

	const handleSave = async () => {
		setSaving(true);
		try {
			await updateSettings(formData);
			toast.success("✅ Settings updated successfully");
		} catch (error) {
			toast.error("❌ Failed to save settings");
		} finally {
			setSaving(false);
		}
	};

	// 🔹 Navbar links helpers
	const handleNavLinkChange = (
		index: number,
		field: "name" | "href",
		value: string
	) => {
		const navLinks = [...(formData.navbar?.navLinks || [])];
		navLinks[index][field] = value;
		setFormData({ ...formData, navbar: { ...formData.navbar, navLinks } });
	};

	const addNavLink = () => {
		const navLinks = [
			...(formData.navbar?.navLinks || []),
			{ name: "", href: "" },
		];
		setFormData({ ...formData, navbar: { ...formData.navbar, navLinks } });
	};

	const removeNavLink = (index: number) => {
		const navLinks = [...(formData.navbar?.navLinks || [])];
		navLinks.splice(index, 1);
		setFormData({ ...formData, navbar: { ...formData.navbar, navLinks } });
	};

	// 🔹 Footer links helpers
	const handleFooterLinkChange = (
		index: number,
		field: "label" | "href",
		value: string
	) => {
		const footerLinks = [...(formData.footer?.footerLinks || [])];
		footerLinks[index][field] = value;
		setFormData({ ...formData, footer: { ...formData.footer, footerLinks } });
	};

	const addFooterLink = () => {
		const footerLinks = [
			...(formData.footer?.footerLinks || []),
			{ label: "", href: "" },
		];
		setFormData({ ...formData, footer: { ...formData.footer, footerLinks } });
	};

	const removeFooterLink = (index: number) => {
		const footerLinks = [...(formData.footer?.footerLinks || [])];
		footerLinks.splice(index, 1);
		setFormData({ ...formData, footer: { ...formData.footer, footerLinks } });
	};

	if (loading) return <div>Loading settings...</div>;

	return (
		<div className="space-y-6">
			{/* 🌐 General */}
			<Card>
				<CardHeader>
					<CardTitle>Site Settings</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<Label>Site Name</Label>
					<Input
						value={formData.siteName || ""}
						onChange={(e) =>
							setFormData({ ...formData, siteName: e.target.value })
						}
					/>
					<Label>Site Title</Label>
					<Input
						value={formData.title || ""}
						onChange={(e) =>
							setFormData({ ...formData, title: e.target.value })
						}
					/>
					<Label>Description</Label>
					<Textarea
						value={formData.description || ""}
						onChange={(e) =>
							setFormData({ ...formData, description: e.target.value })
						}
					/>
				</CardContent>
			</Card>

			{/* 🧠 Hero */}
			<Card>
				<CardHeader>
					<CardTitle>Hero Section</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<Label>Welcome Text</Label>
					<Input
						value={formData.hero?.welcomeText || ""}
						onChange={(e) =>
							setFormData({
								...formData,
								hero: { ...formData.hero, welcomeText: e.target.value },
							})
						}
					/>
					<Label>Hero Title</Label>
					<Input
						value={formData.hero?.title || ""}
						onChange={(e) =>
							setFormData({
								...formData,
								hero: { ...formData.hero, title: e.target.value },
							})
						}
					/>
					<Label>Hero Subtitle</Label>
					<Input
						value={formData.hero?.subtitle || ""}
						onChange={(e) =>
							setFormData({
								...formData,
								hero: { ...formData.hero, subtitle: e.target.value },
							})
						}
					/>
					<Label>Description</Label>
					<Textarea
						value={formData.hero?.description || ""}
						onChange={(e) =>
							setFormData({
								...formData,
								hero: { ...formData.hero, description: e.target.value },
							})
						}
					/>
					<Label>Start Year</Label>
					<Input
						type="number"
						value={formData.hero?.startYear || ""}
						onChange={(e) =>
							setFormData({
								...formData,
								hero: { ...formData.hero, startYear: Number(e.target.value) },
							})
						}
					/>
				</CardContent>
			</Card>

			{/* 🧭 Navbar */}
			<Card>
				<CardHeader>
					<CardTitle>Navbar</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<Label>Logo Text</Label>
					<Input
						value={formData.navbar?.logoText || ""}
						onChange={(e) =>
							setFormData({
								...formData,
								navbar: { ...formData.navbar, logoText: e.target.value },
							})
						}
					/>
					<div className="space-y-2">
						<Label>Navigation Links</Label>
						{formData.navbar?.navLinks?.map((link: any, idx: number) => (
							<div key={idx} className="flex gap-2 items-center">
								<Input
									placeholder="Name"
									value={link.name}
									onChange={(e) =>
										handleNavLinkChange(idx, "name", e.target.value)
									}
								/>
								<Input
									placeholder="Href"
									value={link.href}
									onChange={(e) =>
										handleNavLinkChange(idx, "href", e.target.value)
									}
								/>
								<Button
									variant="destructive"
									size="sm"
									onClick={() => removeNavLink(idx)}
								>
									Remove
								</Button>
							</div>
						))}
						<Button size="sm" onClick={addNavLink}>
							Add Link
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* 🦶 Footer */}
			<Card>
				<CardHeader>
					<CardTitle>Footer</CardTitle>
				</CardHeader>
				<CardContent className="space-y-4">
					<Label>About Text</Label>
					<Textarea
						value={formData.footer?.aboutText || ""}
						onChange={(e) =>
							setFormData({
								...formData,
								footer: { ...formData.footer, aboutText: e.target.value },
							})
						}
					/>

					<div className="space-y-2">
						<Label>Footer Links</Label>
						{formData.footer?.footerLinks?.map((link: any, idx: number) => (
							<div key={idx} className="flex gap-2 items-center">
								<Input
									placeholder="Label"
									value={link.label}
									onChange={(e) =>
										handleFooterLinkChange(idx, "label", e.target.value)
									}
								/>
								<Input
									placeholder="Href"
									value={link.href}
									onChange={(e) =>
										handleFooterLinkChange(idx, "href", e.target.value)
									}
								/>
								<Button
									variant="destructive"
									size="sm"
									onClick={() => removeFooterLink(idx)}
								>
									Remove
								</Button>
							</div>
						))}
						<Button size="sm" onClick={addFooterLink}>
							Add Footer Link
						</Button>
					</div>

					<Label>Copyright Text</Label>
					<Input
						value={formData.footer?.copyrightText || ""}
						onChange={(e) =>
							setFormData({
								...formData,
								footer: { ...formData.footer, copyrightText: e.target.value },
							})
						}
					/>
				</CardContent>
			</Card>

			{/* 🌍 Social Links */}
			<Card>
				<CardHeader>
					<CardTitle>Social Links</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2">
					{["facebook", "twitter", "github", "linkedin", "email"].map((key) => (
						<div key={key}>
							<Label className="capitalize">{key}</Label>
							<Input
								placeholder={key}
								value={formData.socialLinks?.[key] || ""}
								onChange={(e) =>
									setFormData({
										...formData,
										socialLinks: {
											...formData.socialLinks,
											[key]: e.target.value,
										},
									})
								}
							/>
						</div>
					))}
				</CardContent>
			</Card>

			<Button onClick={handleSave} disabled={saving}>
				{saving ? "Saving..." : "Save Settings"}
			</Button>
		</div>
	);
}
