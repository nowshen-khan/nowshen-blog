import { NextResponse, NextRequest } from "next/server"
 import connectDB from "@/lib/mongodb"
import { Blog } from "@/models/Blog"
import { FilterQuery } from 'mongoose';
import { BlogDocument } from '@/models/Blog';

export async function GET(request: NextRequest) {
  try {
     await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');
    const skip = (page - 1) * limit;

    // Build filter
    const filter: FilterQuery<BlogDocument> = { isPublished: true };
    
    if (category) {
      filter.category = category;
    }
    
    if (tag) {
      filter.tags = { $in: [tag] };
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const [blogs, total] = await Promise.all([
      Blog.find(filter)
        .populate('author', 'name image')
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Blog.countDocuments(filter)
    ]);

    return NextResponse.json({
      blogs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      }
    }); 
  } catch (error) {
     console.error('Failed to fetch blogs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
await connectDB()
const body = await req.json()
// server-side validation here
const blog = await Blog.create(body)
return NextResponse.json(blog)
}