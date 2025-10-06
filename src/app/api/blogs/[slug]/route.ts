import { NextResponse } from "next/server"
import connectDB from "@/lib/mongodb"
import Blog from "@/models/Blog"

interface Context {
  params: Promise<{ slug: string }>
}

export async function GET(req: Request,  context: Context) {
  await connectDB()
  const { slug } = await context.params  
  const blog = await Blog.findOne({ slug: slug }).lean()
  if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(blog)
}
