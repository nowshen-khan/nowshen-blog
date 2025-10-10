import { NextResponse } from "next/server"
import connect from "@/lib/mongodb"
import { Blog } from "@/models/Blog"

export async function GET() {
  await connect()
  const blogs = await Blog.find({ isPublished: true }).lean()
  const tags = Array.from(new Set(blogs.flatMap(blog => blog.tags)))
  return NextResponse.json(tags)
}
