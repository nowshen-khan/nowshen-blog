import { NextResponse, NextRequest } from "next/server"
import connectDB from "@/lib/mongodb"
import { Blog } from "@/models/Blog"
import { FilterQuery } from "mongoose"
import { BlogDocument } from "@/models/Blog"

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)

    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const type = searchParams.get("type") // e.g. 'recent', 'featured', 'oldest', 'category', 'tag'
    const category = searchParams.get("category")
    const tag = searchParams.get("tag")
    const search = searchParams.get("search")

    const skip = (page - 1) * limit

    // Default filter
    const filter: FilterQuery<BlogDocument> = { isPublished: true }

    // 🟡 Category Filter
    if (category) {
      filter.category = category
    }

    // 🟡 Tag Filter
    if (tag) {
      filter.tags = { $in: [tag] }
    }

    // 🟡 Search Filter
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { tags: { $in: [new RegExp(search, "i")] } },
      ]
    }

    // 🟢 Type-based sort/filter
    let sortOrder: Record<string, 1 | -1> = { publishedAt: -1, createdAt: -1 }

    if (type === "featured") {
      filter.isFeatured = true
    } else if (type === "oldest") {
      sortOrder = { publishedAt: 1, createdAt: 1 }
    } else if (type === "popular") {
      sortOrder = { views: -1 } // optional if you track blog views
    } else if (type === "liked") {
      sortOrder = { likes: -1 } // optional if you track likes
    } else if (type === "draft") {
      filter.isPublished = false
    }
    // 'recent' default sort (no need to change)

    // 🧠 Fetch blogs
    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .populate("author", "name image")
        .sort(sortOrder)
        .skip(skip)
        .limit(limit),
      Blog.countDocuments(filter),
    ])

    return NextResponse.json({
      blogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Failed to fetch blogs:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  await connectDB()
  const body = await req.json()
  const blog = await Blog.create(body)
  return NextResponse.json(blog)
}
