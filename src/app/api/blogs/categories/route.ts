import { NextResponse } from "next/server"
import connect from "@/lib/mongodb"
import Blog from "@/models/Blog"

export async function GET() {
  await connect()
  const blogs = await Blog.find({ isPublished: true }).lean()
  const categories = Array.from(new Set(blogs.map(blog => blog.category)))
  return NextResponse.json(categories)
}
