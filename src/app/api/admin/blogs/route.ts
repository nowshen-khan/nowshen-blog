// app/api/admin/blogs/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Blog } from '@/models/Blog'
import connectDB from '@/lib/mongodb'

export async function GET() {
  try {
    await connectDB()
    const blogs = await Blog.find().sort({ createdAt: -1 })
    return NextResponse.json(blogs)
  } catch (error) {
    return NextResponse.json({ error:   error.message || 'Failed to fetch blogs' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const body = await request.json()
    
    const blog = new Blog({
      ...body,
      author: '65a1b2c3d4e5f6a7b8c9d0e1', // Replace with actual user ID
    })
    
    await blog.save()
    return NextResponse.json(blog)
  } catch (error) {
    return NextResponse.json({ error:  error.message || 'Failed to create blog' }, { status: 500 })
  }
}