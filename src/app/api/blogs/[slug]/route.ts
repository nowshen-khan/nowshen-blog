import { NextResponse } from "next/server"
import connect from "@/lib/mongodb"
import Blog from "@/models/Blog"

interface Params {
  slug: string
}

export async function GET(req: Request, { params }: { params: Params }) {
  await connect()
  const blog = await Blog.findOne({ slug: params.slug }).lean()
  if (!blog) return NextResponse.json({ error: "Not found" }, { status: 404 })
  return NextResponse.json(blog)
}
