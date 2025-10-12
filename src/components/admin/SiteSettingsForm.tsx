"use client";

import { useState, useEffect } from "react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "../ui/label";
import { toast } from "sonner";

import { SiteSettings as SiteSettingsType } from "@/types/SiteSettings";
export default function SiteSettingsForm() {
	const { settings, loading, updateSettings } = useSiteSettings();
	const [formData, setFormData] = useState<SiteSettingsType | null>(null);
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
		field: "label" | "href",
		value: string
	) => {
		const navLinks = [...(formData.navbar?.navLinks || [])];
		navLinks[index][field] = value;
		setFormData({ ...formData, navbar: { ...formData.navbar, navLinks } });
	};

	const addNavLink = () => {
		const navLinks = [
			...(formData.navbar?.navLinks || []),
			{ label: "", href: "" },
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
		colIndex: number,
		linkIndex: number,
		field: "label" | "href",
		value: string
	) => {
		const columns = [...(formData.footer?.columns || [])];
		columns[colIndex].links[linkIndex][field] = value;
		setFormData({ ...formData, footer: { ...formData.footer, columns } });
	};

	const addFooterLink = (colIndex: number) => {
		const columns = [...(formData.footer?.columns || [])];
		columns[colIndex].links.push({ label: "", href: "" });
		setFormData({ ...formData, footer: { ...formData.footer, columns } });
	};

	const removeFooterLink = (colIndex: number, linkIndex: number) => {
		const columns = [...(formData.footer?.columns || [])];
		columns[colIndex].links.splice(linkIndex, 1);
		setFormData({ ...formData, footer: { ...formData.footer, columns } });
	};

	if (loading)
		return (
			<p className="text-center text-muted-foreground">Loading settings...</p>
		);
	if (!formData)
		return <p className="text-center text-red-500">No settings found.</p>;

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
									placeholder="Label"
									value={link.label}
									onChange={(e) =>
										handleNavLinkChange(idx, "label", e.target.value)
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
					{/* About Text */}
					<div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
						<Label className="w-full sm:w-1/4">About Text</Label>
						<Textarea
							className="w-full sm:w-3/4"
							value={formData.footer?.brand?.tagline || ""}
							onChange={(e) =>
								setFormData({
									...formData,
									footer: {
										...formData.footer,
										brand: {
											...formData.footer.brand,
											tagline: e.target.value,
										},
									},
								})
							}
						/>
					</div>

					{/* Footer Columns */}
					<Label>Footer Columns</Label>
					<div className="space-y-4">
						{formData.footer?.columns?.map((col: any, colIdx: number) => (
							<div key={colIdx} className="border p-3 rounded-md space-y-2">
								<Label className="font-semibold">{col.title}</Label>
								<div className="space-y-2">
									{col.links.map((link: any, linkIdx: number) => (
										<div
											key={linkIdx}
											className="flex flex-col sm:flex-row sm:items-center sm:gap-2"
										>
											<Input
												placeholder="Label"
												className="w-full sm:w-1/3"
												value={link.label}
												onChange={(e) =>
													handleFooterLinkChange(
														colIdx,
														linkIdx,
														"label",
														e.target.value
													)
												}
											/>
											<Input
												placeholder="Href"
												className="w-full sm:w-1/3"
												value={link.href}
												onChange={(e) =>
													handleFooterLinkChange(
														colIdx,
														linkIdx,
														"href",
														e.target.value
													)
												}
											/>
											<Button
												variant="destructive"
												size="sm"
												className="w-full sm:w-auto"
												onClick={() => removeFooterLink(colIdx, linkIdx)}
											>
												Remove
											</Button>
										</div>
									))}
									<Button
										size="sm"
										className="mt-1"
										onClick={() => addFooterLink(colIdx)}
									>
										Add Footer Link
									</Button>
								</div>
							</div>
						))}
					</div>

					{/* Copyright */}
					<div className="flex flex-col sm:flex-row sm:items-center sm:gap-4">
						<Label className="w-full sm:w-1/4">Copyright Text</Label>
						<Input
							className="w-full sm:w-3/4"
							value={formData.footer?.copyright || ""}
							onChange={(e) =>
								setFormData({
									...formData,
									footer: { ...formData.footer, copyright: e.target.value },
								})
							}
						/>
					</div>
				</CardContent>
			</Card>

			{/* 🌍 Social Links */}
			<Card>
				<CardHeader>
					<CardTitle>Social Links</CardTitle>
				</CardHeader>
				<CardContent className="space-y-2">
					{Object.entries(formData.footer?.socialLinks || {}).map(
						([key, value]) => (
							<div
								key={key}
								className="flex flex-col sm:flex-row sm:items-center sm:gap-2"
							>
								<Label className="capitalize w-full sm:w-1/4">{key}</Label>
								<Input
									className="w-full sm:w-3/4"
									placeholder={value}
									value={value}
									onChange={(e) =>
										setFormData({
											...formData,
											footer: {
												...formData.footer,
												socialLinks: {
													...formData.footer.socialLinks,
													[key]: e.target.value,
												},
											},
										})
									}
								/>
							</div>
						)
					)}
				</CardContent>
			</Card>

			<Button onClick={handleSave} disabled={saving}>
				{saving ? "Saving..." : "Save Settings"}
			</Button>
		</div>
	);
}
