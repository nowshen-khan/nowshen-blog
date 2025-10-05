import { NextResponse } from "next/server"
import connect from "@/lib/mongodb"
import Blog from "@/models/Blog"

export async function GET() {
  await connect()
  const blogs = await Blog.find({ isPublished: true })
    .sort({ publishedAt: -1 })
    .lean()
  return NextResponse.json(blogs)
}
