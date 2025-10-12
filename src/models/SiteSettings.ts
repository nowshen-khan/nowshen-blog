// models/SiteSettings.ts
import mongoose from "mongoose";

const SiteSettingsSchema = new mongoose.Schema(
	{
		siteName: { type: String, required: true },
		title: { type: String, required: true },
		description: { type: String, required: true },

		// Navbar data
		navbar: {
			useImage: { type: Boolean, default: false },
			logoText: { type: String, default: "Nowshen.blog" },
			logoImage: { type: String },
			navLinks: [
				{
					label: String,
					href: String,
					exact: Boolean,
					order: Number,
					icon: String,
				},
			],
		},

		// Footer data
		footer: {
			brand: {
				useImage: { type: Boolean, default: false },
				logoText: String,
				logoImage: String,
				tagline: String,
			},
			phone: { type: String },
			email: { type: String },
			address: { type: String },
			columns: [
				{
					title: String,
					links: [{ label: String, href: String, order: Number }],
				},
			],
			socialLinks: {
				twitter: String,
				github: String,
				linkedin: String,
				instagram: String,
				facebook: String,
				email: String,
			},
			location: String,
			copyright: String,
		},

		hero: {
			startYear: { type: Number, default: 2024 },
			welcomeText: String,
			title: String,
			subtitle: String,
			description: String,
			expertise: [String],
			stats: [
				{
					icon: String,
					number: String,
					label: String,
				},
			],
			buttons: {
				primary: { text: String, href: String },
				secondary: { text: String, href: String },
			},
		},
		seoSettings: {
			metaTitle: String,
			metaDescription: String,
			keywords: [String],
		},
	},
	{ timestamps: true }
);

export default mongoose.models.SiteSettings ||
	mongoose.model("SiteSettings", SiteSettingsSchema);
