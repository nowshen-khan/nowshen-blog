// app/api/admin/blogs/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Blog, BlogDocument } from "@/models/Blog";
import connectDB from "@/lib/mongodb";

// Type for request body
type BlogUpdateBody = Partial<Omit<BlogDocument, "_id">>;

// Error handler
const handleError = (error: unknown) => {
	if (error instanceof Error) return error.message;
	return "Something went wrong";
};

// ---------------- PUT ----------------
export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> } // ✅ params is now a Promise
) {
	try {
		await connectDB();
		const { id } = await params; // ✅ Await the params
		const body: BlogUpdateBody = await request.json();

		const blog = await Blog.findByIdAndUpdate(id, body, {
			// ✅ Use the awaited id
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
	{ params }: { params: Promise<{ id: string }> } // ✅ Same fix
) {
	try {
		await connectDB();
		const { id } = await params; // ✅ Await the params

		const blog = await Blog.findByIdAndDelete(id); // ✅ Use the awaited id

		if (!blog) {
			return NextResponse.json({ error: "Blog not found" }, { status: 404 });
		}

		return NextResponse.json({ message: "Blog deleted successfully" });
	} catch (error: unknown) {
		return NextResponse.json({ error: handleError(error) }, { status: 500 });
	}
}
