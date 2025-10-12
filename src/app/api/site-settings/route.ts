import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";

// Type definitions
interface NavbarItem {
	label: string;
	href: string;
	order?: number;
}

interface FooterColumn {
	title: string;
	links: { label: string; href: string }[];
}

interface HeroButton {
	text: string;
	href: string;
}

interface HeroStat {
	_id?: string;
	icon: string;
	number: string;
	label: string;
}

interface Hero {
	heading?: string;
	subheading?: string;
	buttons?: {
		primary?: HeroButton;
		secondary?: HeroButton;
	};
	stats?: HeroStat[];
}

interface SEOSettings {
	metaTitle?: string;
	metaDescription?: string;
	metaKeywords?: string[];
}

export interface SiteSettingsType {
	siteName?: string;
	title?: string;
	description?: string;
	navbar?: NavbarItem[];
	footer?: FooterColumn[];
	hero?: Hero;
	seoSettings?: SEOSettings;
}

// ✅ GET: read-only site settings
export async function GET() {
	try {
		await connectDB();
		const settings = await SiteSettings.findOne();
		return NextResponse.json(settings);
	} catch (error) {
		console.error("GET SiteSettings error:", error);
		return NextResponse.json(
			{ error: "Failed to fetch settings" },
			{ status: 500 }
		);
	}
}

// ✅ PUT: safe update (ignores hero.stats and removes upsert)
export async function PUT(request: Request) {
	try {
		await connectDB();
		const body = await request.json();

		// only allow specific fields
		const allowedFields = [
			"siteName",
			"title",
			"description",
			"navbar",
			"footer",
			"hero",
			"seoSettings",
		];

		const updateData: Partial<SiteSettingsType> = {};
		for (const field of allowedFields) {
			if (body[field] !== undefined) updateData[field] = body[field];
		}

		// prevent hero.stats overwrite
		if (updateData.hero) delete updateData.hero.stats;

		const updated = await SiteSettings.findOneAndUpdate(
			{},
			{ $set: updateData },
			{ new: true }
		);

		return NextResponse.json(updated);
	} catch (error) {
		console.error("PUT SiteSettings error:", error);
		return NextResponse.json(
			{ error: "Failed to update settings" },
			{ status: 500 }
		);
	}
}
