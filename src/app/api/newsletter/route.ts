import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Newsletter from "@/models/Newsletter";

export async function POST(req: Request) {
	try {
		await connectDB();
		const { email } = await req.json();

		if (!email) {
			return NextResponse.json({ error: "Email is required" }, { status: 400 });
		}

		const existing = await Newsletter.findOne({ email });
		if (existing) {
			return NextResponse.json(
				{ error: "Already subscribed!" },
				{ status: 409 }
			);
		}

		await Newsletter.create({ email });
		return NextResponse.json(
			{ message: "Subscribed successfully!" },
			{ status: 201 }
		);
	} catch (err) {
		console.error(err);
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
