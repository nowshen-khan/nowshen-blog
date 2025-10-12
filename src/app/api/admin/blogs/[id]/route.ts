// app/api/admin/blogs/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Blog, BlogDocument } from "@/models/Blog";
import connectDB from "@/lib/mongodb";
import { Document } from "mongoose";

// ✅ Type for request body
type BlogUpdateBody = Partial<Omit<BlogDocument, "_id">>;

// ✅ Type-safe error handler
const handleError = (error: unknown) => {
	if (error instanceof Error) return error.message;
	return "Something went wrong";
};

// ---------------- PUT ----------------
export async function PUT(
	request: NextRequest,
	context: { params: { id: string } }
): Promise<NextResponse<BlogDocument | { error: string }>> {
	const { params } = context;

	try {
		await connectDB();

		const body: BlogUpdateBody = await request.json();

		const blog = await Blog.findByIdAndUpdate(params.id, body, {
			new: true,
			runValidators: true,
		});

		if (!blog) {
			return NextResponse.json({ error: "Blog not found" }, { status: 404 });
		}

		return NextResponse.json(blog);
	} catch (error: unknown) {
		return NextResponse.json({ error: handleError(error) }, { status: 500 });
	}
}

// ---------------- DELETE ----------------
export async function DELETE(
	request: NextRequest,
	context: { params: { id: string } }
): Promise<NextResponse<{ message: string } | { error: string }>> {
	const { params } = context;

	try {
		await connectDB();

		const blog = await Blog.findByIdAndDelete(params.id);

		if (!blog) {
			return NextResponse.json({ error: "Blog not found" }, { status: 404 });
		}

		return NextResponse.json({ message: "Blog deleted successfully" });
	} catch (error: unknown) {
		return NextResponse.json({ error: handleError(error) }, { status: 500 });
	}
}
