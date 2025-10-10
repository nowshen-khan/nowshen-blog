// app/admin/blogs/new/page.tsx
import BlogEditor from '@/components/admin/BlogEditor'

export default function NewBlogPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create New Blog</h1>
      <BlogEditor />
    </div>
  )
}