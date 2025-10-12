// app/api/blogs/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Blog, BlogDocument } from "@/models/Blog";
import connectDB from "@/lib/mongodb";

// Error handler
const handleError = (error: unknown) => {
	if (error instanceof Error) return error.message;
	return "Something went wrong";
};

// ---------------- GET ----------------
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ slug: string }> } // ✅ Change to 'slug'
) {
	try {
		await connectDB();
		const { slug } = await params; // ✅ Destructure 'slug' instead of 'id'

		// Update your query to use slug instead of id
		const blog = await Blog.findOne({ slug: slug }); // or however you query by slug

		if (!blog) {
			return NextResponse.json({ error: "Blog not found" }, { status: 404 });
		}

		return NextResponse.json(blog);
	} catch (error: unknown) {
		return NextResponse.json({ error: handleError(error) }, { status: 500 });
	}
}

// If you have other methods (PUT, DELETE) in this file, update them too:
export async function PUT(
	request: NextRequest,
	{ params }: { params: Promise<{ slug: string }> } // ✅ Change to 'slug'
) {
	try {
		await connectDB();
		const { slug } = await params; // ✅ Destructure 'slug'
		const body = await request.json();

		const blog = await Blog.findOneAndUpdate({ slug: slug }, body, {
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

export async function DELETE(
	request: NextRequest,
	{ params }: { params: Promise<{ slug: string }> } // ✅ Change to 'slug'
) {
	try {
		await connectDB();
		const { slug } = await params; // ✅ Destructure 'slug'

		const blog = await Blog.findOneAndDelete({ slug: slug });

		if (!blog) {
			return NextResponse.json({ error: "Blog not found" }, { status: 404 });
		}

		return NextResponse.json({ message: "Blog deleted successfully" });
	} catch (error: unknown) {
		return NextResponse.json({ error: handleError(error) }, { status: 500 });
	}
}
