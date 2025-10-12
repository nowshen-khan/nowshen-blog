import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";

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

		const updateData: Record<string, any> = {};
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
