import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Contact } from "@/models/Contact";

// 🔹 GET — single contact
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		await connectDB();
		const { id } = await params; // ✅ Await params and destructure
		const contact = await Contact.findById(id); // ✅ Use the destructured id

		if (!contact) {
			return NextResponse.json({ error: "Contact not found" }, { status: 404 });
		}

		return NextResponse.json(contact);
	} catch (error) {
		console.error("Failed to fetch contact:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

// 🔹 PUT — full update (body থেকে সব ফিল্ড update)
export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		await connectDB();
		const { id } = await params; // ✅ Await params and destructure
		const body = await request.json();

		const contact = await Contact.findByIdAndUpdate(id, body, {
			new: true,
			runValidators: true,
		});

		if (!contact) {
			return NextResponse.json({ error: "Contact not found" }, { status: 404 });
		}

		return NextResponse.json(contact);
	} catch (error) {
		console.error("Failed to update contact:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}

// 🔹 PATCH — only status update (Mark as Read/Unread etc.)
export async function PATCH(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		await connectDB();
		const { id } = await params; // ✅ Await params and destructure
		const { status } = await request.json();

		if (!["new", "read", "replied", "closed"].includes(status)) {
			return NextResponse.json({ error: "Invalid status" }, { status: 400 });
		}

		const contact = await Contact.findById(id);
		if (!contact) {
			return NextResponse.json({ error: "Contact not found" }, { status: 404 });
		}

		contact.status = status;
		await contact.save();

		return NextResponse.json({
			success: true,
			message: `Status updated to ${status}`,
			contact,
		});
	} catch (error) {
		console.error("Error updating contact status:", error);
		return NextResponse.json(
			{ error: "Failed to update contact" },
			{ status: 500 }
		);
	}
}

// 🔹 DELETE — remove contact
export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		await connectDB();
		const { id } = await params;
		const contact = await Contact.findByIdAndDelete(id);

		if (!contact) {
			return NextResponse.json({ error: "Contact not found" }, { status: 404 });
		}

		return NextResponse.json({ message: "Contact deleted successfully" });
	} catch (error) {
		console.error("Failed to delete contact:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
