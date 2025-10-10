// app/api/admin/blogs/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Blog } from '@/models/Blog'
import connectDB from '@/lib/mongodb'

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    const body = await request.json()
    
    const blog = await Blog.findByIdAndUpdate(
      params.id,
      body,
      { new: true, runValidators: true }
    )
    
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }
    
    return NextResponse.json(blog)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB()
    const blog = await Blog.findByIdAndDelete(params.id)
    
    if (!blog) {
      return NextResponse.json({ error: 'Blog not found' }, { status: 404 })
    }
    
    return NextResponse.json({ message: 'Blog deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 })
  }
}