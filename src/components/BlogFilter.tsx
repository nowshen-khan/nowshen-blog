// src/components/BlogFilter.tsx
"use client"

import { useState } from "react"
import BlogCard from "@/components/BlogCard"

type Blog = {
  _id: string
  title: string
  slug: string
  excerpt: string
  coverImage: string
  category: string
  tags: string[]
  readingTime: number
}

interface BlogFilterProps {
  blogs: Blog[]
}

export default function BlogFilter({ blogs }: BlogFilterProps) {
  const [filter, setFilter] = useState<string | null>(null)

  const filteredBlogs = filter
    ? blogs.filter(blog => blog.category === filter || blog.tags.includes(filter))
    : blogs

  const categories = Array.from(new Set(blogs.map(blog => blog.category)))
  const tags = Array.from(new Set(blogs.flatMap(blog => blog.tags)))

  return (
    <div className="py-16">
      {/* Filter buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {[...categories, ...tags].map(f => (
          <button
            key={f}
            className={`px-3 py-1 rounded-md border ${
              filter === f ? "bg-primary text-white" : "border-border"
            }`}
            onClick={() => setFilter(filter === f ? null : f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Blog cards */}
      <main className="max-w-6xl mx-auto px-6 grid gap-8 md:grid-cols-3">
        {filteredBlogs.length === 0 ? (
          <p className="text-center col-span-full">No blogs found.</p>
        ) : (
          filteredBlogs.map(blog => (
            <BlogCard
              key={blog._id}
              title={blog.title}
              excerpt={blog.excerpt}
              image={blog.coverImage}
              href={`/blog/${blog.slug}`}
            />
          ))
        )}
      </main>
    </div>
  )
}
