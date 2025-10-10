// components/admin/SiteSettingsForm.tsx
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
	const [formData, setFormData] = useState({});
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		if (settings) {
			setFormData(settings);
		}
	}, [settings]);

	const handleSave = async () => {
		setSaving(true);
		try {
			await updateSettings(formData);
			// Show success message
			toast.success("✅ Settings updated successfully");
		} catch (error) {
			// Show error message
			toast.error("❌ Failed to save settings");
		} finally {
			setSaving(false);
		}
	};

	const handleNavbarLinkChange = (
		index: number,
		field: "label" | "href",
		value: string
	) => {
		const links = [...(formData.navbar?.links || [])];
		links[index][field] = value;
		setFormData({ ...formData, navbar: { ...formData.navbar, links } });
	};

	const addNavbarLink = () => {
		const links = [...(formData.navbar?.links || []), { label: "", href: "" }];
		setFormData({ ...formData, navbar: { ...formData.navbar, links } });
	};

	const removeNavbarLink = (index: number) => {
		const links = [...(formData.navbar?.links || [])];
		links.splice(index, 1);
		setFormData({ ...formData, navbar: { ...formData.navbar, links } });
	};

	const handleFooterLinkChange = (
		index: number,
		field: "label" | "href",
		value: string
	) => {
		const links = [...(formData.footer?.links || [])];
		links[index][field] = value;
		setFormData({ ...formData, footer: { ...formData.footer, links } });
	};

	const addFooterLink = () => {
		const links = [...(formData.footer?.links || []), { label: "", href: "" }];
		setFormData({ ...formData, footer: { ...formData.footer, links } });
	};

	const removeFooterLink = (index: number) => {
		const links = [...(formData.footer?.links || [])];
		links.splice(index, 1);
		setFormData({ ...formData, footer: { ...formData.footer, links } });
	};

	if (loading) return <div>Loading settings...</div>;

	return (
		<div className="space-y-6">
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

			{/* Hero Section */}
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

					<Label className="block text-sm font-medium mb-1">
						Hero Subtitle
					</Label>
					<Input
						name="hero.subtitle"
						value={formData.hero?.subtitle || ""}
						onChange={(e) =>
							setFormData({
								...formData,
								hero: { ...formData.hero, subtitle: e.target.value },
							})
						}
					/>

					<Label className="block text-sm font-medium mb-1">
						Hero Description
					</Label>
					<Textarea
						name="hero.description"
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
					{/* Add more fields */}
				</CardContent>
			</Card>

			{/* Need to work on */}
			{/* Navbar Section */}
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
						<Label>Links</Label>
						{formData.navbar?.links?.map((link: any, idx: number) => (
							<div key={idx} className="flex gap-2 items-center">
								<Input
									placeholder="Label"
									value={link.label}
									onChange={(e) =>
										handleNavbarLinkChange(idx, "label", e.target.value)
									}
								/>
								<Input
									placeholder="Href"
									value={link.href}
									onChange={(e) =>
										handleNavbarLinkChange(idx, "href", e.target.value)
									}
								/>
								<Button
									variant="destructive"
									size="sm"
									onClick={() => removeNavbarLink(idx)}
								>
									Remove
								</Button>
							</div>
						))}
						<Button size="sm" onClick={addNavbarLink}>
							Add Link
						</Button>
					</div>
				</CardContent>
			</Card>

			{/* Footer Section */}
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
						<Label>Links</Label>
						{formData.footer?.links?.map((link: any, idx: number) => (
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
							Add Link
						</Button>
					</div>

					{/* Social Links */}
					<div className="space-y-2">
						<Label>Social Links</Label>
						{["facebook", "twitter", "github", "linkedin", "email"].map(
							(key) => (
								<Input
									key={key}
									placeholder={key}
									value={formData.footer?.socialLinks?.[key] || ""}
									onChange={(e) =>
										setFormData({
											...formData,
											footer: {
												...formData.footer,
												socialLinks: {
													...formData.footer?.socialLinks,
													[key]: e.target.value,
												},
											},
										})
									}
								/>
							)
						)}
					</div>
				</CardContent>
			</Card>

			<Button onClick={handleSave} disabled={saving}>
				{saving ? "Saving..." : "Save Settings"}
			</Button>
		</div>
	);
}
