import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Contact } from "@/models/Contact";
// import { FilterQuery } from "mongoose";
// import { BlogDocument } from "@/models/Blog";

interface ContactRequestBody {
	name: string;
	email: string;
	phone?: string;
	subject: string;
	message: string;
	service?: string;
}

interface ValidationError extends Error {
	name: "ValidationError";
	errors: Record<string, { message: string }>;
}

export async function POST(request: NextRequest) {
	try {
		await connectDB();

		const body = (await request.json()) as ContactRequestBody;
		const { name, email, phone, subject, message, service } = body;

		// Validation
		if (!name || !email || !subject || !message) {
			return NextResponse.json(
				{ error: "Name, email, subject, and message are required" },
				{ status: 400 }
			);
		}

		// Get client info
		const ipAddress =
			request.headers.get("x-forwarded-for") ||
			request.headers.get("x-real-ip") ||
			"unknown";
		const userAgent = request.headers.get("user-agent") || "unknown";

		// Create contact submission
		const contact = new Contact({
			name: name.trim(),
			email: email.toLowerCase().trim(),
			phone: phone?.trim(),
			subject: subject.trim(),
			message: message.trim(),
			service: service?.trim(),
			ipAddress,
			userAgent,
			status: "new",
		});

		await contact.save();

		// Here you can add email notification logic
		// await sendEmailNotification(contact);

		return NextResponse.json(
			{
				success: true,
				message: "Thank you for your message! We will get back to you soon.",
				contactId: contact._id, //.toString(),
			},
			{ status: 201 }
		);
	} catch (error: unknown) {
		console.error("Contact form error:", error);

		// ✅ Type guard for Mongoose validation error
		if (
			typeof error === "object" &&
			error !== null &&
			"name" in error &&
			(error as ValidationError).name === "ValidationError"
		) {
			const validationError = error as ValidationError;
			const messages = Object.values(validationError.errors).map(
				(err) => err.message
			);
			return NextResponse.json({ error: messages.join(", ") }, { status: 400 });
		}

		// ✅ Fallback for unknown errors
		const message =
			error instanceof Error ? error.message : "Internal server error";

		return NextResponse.json({ error: message }, { status: 500 });
	}
}

// GET - Admin route to fetch contact submissions

/*
export async function GET(request: NextRequest) {
    try {
        ///
		// Add admin authentication here
		// const session = await getServerSession();
		// if (!session || session.user.role !== 'admin') {
		//   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
		// }
///
		await connectDB();

		const { searchParams } = new URL(request.url);
		const page = parseInt(searchParams.get("page") || "1");
		const limit = parseInt(searchParams.get("limit") || "10");
		const status = searchParams.get("status");
		const skip = (page - 1) * limit;

		const filter: FilterQuery<BlogDocument> = {};
		if (status && status !== "all") {
			filter.status = status;
		}

		const contacts = await Contact.find(filter)
			.sort({ createdAt: -1 })
			.skip(skip)
			.limit(limit);

		const total = await Contact.countDocuments(filter);
		const newCount = await Contact.countDocuments({ status: "new" });

		return NextResponse.json({
			contacts,
			pagination: {
				page,
				limit,
				total,
				pages: Math.ceil(total / limit),
			},
			counts: {
				new: newCount,
				total,
			},
		});
	} catch (error) {
		console.error("Failed to fetch contacts:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
*/
