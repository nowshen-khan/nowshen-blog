import { NextResponse } from "next/server"
 import connectDB from "@/lib/mongodb"
import Blog from "@/models/Blog"

// export async function GET() {
//   await connectDB()
//   const blogs = await Blog.find({ isPublished: true })
//     .sort({ publishedAt: -1 })
//     .lean()
//   return NextResponse.json(blogs)
// }

export async function GET(req: Request) {
  await connectDB()

  const { searchParams } = new URL(req.url)
  const type = searchParams.get("type")
  const value = searchParams.get("value")
  const limit = Number(searchParams.get("limit")) || 6

  let query = {}

  switch (type) {
    case "featured":
      query = { isFeatured: true }
      break
    case "category":
      query = { category: value }
      break
    case "tag":
      query = { tags: { $in: [value] } }
      break
    case "search":
      query = {
        $or: [
          { title: { $regex: value, $options: "i" } },
          { excerpt: { $regex: value, $options: "i" } },
          { content: { $regex: value, $options: "i" } },
        ],
      }
      break
    case "oldest":
      return NextResponse.json(await Blog.find(query).sort({ createdAt: 1 }).limit(limit))
    default: // recent, latest etc.
      query = {}
  }

  const blogs = await Blog.find(query).sort({ createdAt: -1 }).limit(limit)
  return NextResponse.json(blogs)
}

export async function POST(req: Request) {
await connectDB()
const body = await req.json()
// server-side validation here
const blog = await Blog.create(body)
return NextResponse.json(blog)
}