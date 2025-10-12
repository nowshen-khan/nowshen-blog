import { NextRequest, NextResponse } from "next/server";
import { Blog, BlogDocument } from "@/models/Blog";
import connectDB from "@/lib/mongodb";

export async function PUT(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		await connectDB();
		const body = await request.json();
		const blog = await Blog.findByIdAndUpdate(params.id, body, {
			new: true,
			runValidators: true,
		});

		if (!blog) {
			return NextResponse.json({ error: "Blog not found" }, { status: 404 });
		}

		return NextResponse.json(blog);
	} catch (error: unknown) {
		let message = "Failed to update blog";
		if (error instanceof Error) message = error.message;
		return NextResponse.json({ error: message }, { status: 500 });
	}
}

export async function DELETE(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		await connectDB();
		const blog = await Blog.findByIdAndDelete(params.id);

		if (!blog) {
			return NextResponse.json({ error: "Blog not found" }, { status: 404 });
		}

		return NextResponse.json({ message: "Blog deleted successfully" });
	} catch (error: unknown) {
		let message = "Failed to delete blog";
		if (error instanceof Error) message = error.message;
		return NextResponse.json({ error: message }, { status: 500 });
	}
}
