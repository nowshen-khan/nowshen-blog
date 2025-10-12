import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { Blog } from "@/models/Blog";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ slug: string }> }
) {
	try {
		await connectDB();

		const { slug } = await params;

		const blog = await Blog.findOne({
			$or: [{ _id: slug }, { slug: slug }],
			isPublished: true,
		}).populate("author", "name image");

		if (!blog) {
			return NextResponse.json(
				{ error: "Blog post not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json(blog);
	} catch (error) {
		console.error("Failed to fetch blog:", error);
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
