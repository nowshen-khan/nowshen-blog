// app/admin/blogs/[id]/page.tsx
import { notFound } from 'next/navigation'
import { Blog } from '@/models/Blog'
import connectDB from '@/lib/mongodb'
import BlogEditor from '@/components/admin/BlogEditor'
import { updateBlog } from './actions'

interface Props {
  params: {
    id: string
  }
}

export default async function EditBlogPage({ params }: Props) {
  await connectDB()
  
  const blog = await Blog.findById(params.id).lean()
  
 if (!blog) notFound()

  async function handleSave(blogData: any) {
    "use server"
    await updateBlog(params.id, blogData)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Blog</h1>
      <BlogEditor blog={blog} onSave={handleSave}  />
    </div>
  )
}