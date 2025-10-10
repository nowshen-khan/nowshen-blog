// app/api/blog/route.ts
import { NextResponse } from 'next/server'
import { Blog } from '@/models/Blog'
import connectDB from '@/lib/mongodb'

export async function GET(request: Request) {
  await connectDB()
  
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const category = searchParams.get('category')
  
  const query: any = { isPublished: true }
  if (category) query.category = category
  
  const blogs = await Blog.find(query)
    .populate('author', 'name image')
    .sort({ publishedAt: -1 })
    .skip((page - 1) * limit)
    .limit(limit)
    .lean()

  return NextResponse.json(blogs)
}