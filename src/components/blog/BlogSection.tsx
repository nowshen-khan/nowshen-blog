"use client"

import { useEffect, useState } from "react"
import BlogCard from "@/components/blog/BlogCard"
import Link from "next/link"

type Blog = {
  _id: string
  title: string
  excerpt: string
  coverImage: string
  slug: string
  category?: string
  tags?: string[]
  isFeatured?: boolean
  createdAt?: string
}


type BlogSectionProps = {
  title?: string
  type?: "recent" | "featured" | "category" | "tag" | "latest" | "oldest" | "search"
  value?: string // e.g. category name, tag name, or search term
  limit?: number
  showViewAll?: boolean
}

export default function BlogSection({
  title = "Articles",
  type = "recent",
  value,
  limit = 6,
  showViewAll = true,
}: BlogSectionProps) {
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    let url = `/api/blogs?type=${type}&limit=${limit}`
    if (value) url += `&value=${encodeURIComponent(value)}`

    fetch(url)
      .then((res) => res.json())
      .then((data) => setBlogs(data))
  }, [type, value, limit])

  if (!blogs.length)
    return (
      <section className="py-16 text-center">
        <p className="text-gray-500">No articles found.</p>
      </section>
    )

  return (
    <section className=" bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10 text-center md:text-left">{title}</h2>

        <div className={`grid gap-8 ${type === "featured" ? "md:grid-cols-3" : "md:grid-cols-4"}`}>
          {blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              title={blog.title}
              excerpt={blog.excerpt}
              image={blog.coverImage}
              href={`/blog/${blog.slug}`}
            />
          ))}
        </div>

        {showViewAll && (
          <div className="text-center mt-8">
            <Link href={`${type}/blog`} className="text-primary font-semibold hover:underline">
              View All Articles →
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
