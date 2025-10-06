// /app/api/filters/route.ts
import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Blog from "@/models/Blog"

export async function GET() {
  await connectDB()
  const categories = await Blog.distinct("category")
  const tags = await Blog.distinct("tags")
  return NextResponse.json({ categories, tags })
}
