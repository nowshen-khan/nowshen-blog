// app/api/admin/blogs/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Blog } from "@/models/Blog";

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
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message || "Failed to update blog" },
			{ status: 500 }
		);
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
	} catch (error: any) {
		return NextResponse.json(
			{ error: error.message || "Failed to delete blog" },
			{ status: 500 }
		);
	}
}
