"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

type Blog = {
  _id: string
  title: string
  slug: string
}

export default function HeroRecentPosts() {
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    fetch("/api/blogs?type=recent&limit=3")
  .then(res => res.json())
  .then(data => setBlogs(data.blogs))
  }, [])

  if (!blogs.length) return null
console.log(blogs)
  return (
    <div className="mt-8 p-6 bg-background/50  backdrop-blur-sm rounded-2xl border">
      <h3 className="font-semibold text-lg mb-4">Recently Published</h3>
      <ul className="space-y-3">
        {blogs.map(blog => (
            <li key={blog._id} className="flex items-center gap-3 text-sm">
                 <div className="w-2 h-2 bg-primary rounded-full" aria-hidden="true" />
            <Link href={`/blog/${blog.slug}`} className="text-muted-foreground hover:text-foreground transition-colors">
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
