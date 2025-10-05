"use client"
import { useEffect, useState } from "react"
import BlogCard from "@/components/BlogCard"

type Blog = {
  _id: string
  title: string
  excerpt: string
  coverImage: string
  slug: string
}

export default function RecentArticles() {
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    fetch("/api/blogs")
      .then(res => res.json())
      .then(data => setBlogs(data.slice(0, 4))) // recent 4 blogs
  }, [])

  return (
    <section className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10 text-center md:text-left">Latest Articles</h2>

        <div className="grid gap-8 md:grid-cols-4">
          {blogs.map(blog => (
            <BlogCard
              key={blog._id}
              title={blog.title}
              excerpt={blog.excerpt}
              image={blog.coverImage}
              href={`/blog/${blog.slug}`}
            />
          ))}
        </div>
        <div className="text-center mt-8">
          <a href="/blog" className="text-primary font-semibold hover:underline">
            View All Articles →
          </a>
        </div>
      </div>
    </section>
  )
}
