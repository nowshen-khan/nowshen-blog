"use client"
import { useState, useEffect } from "react"
import BlogCard from "@/components/BlogCard"
import FilterSidebar from "@/components/FilterSidebar"

type Blog = {
  _id: string
  title: string
  excerpt: string
  coverImage: string
  slug: string
  category: string
  tags: string[]
  publishedAt: string
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [filtered, setFiltered] = useState<Blog[]>([])

  useEffect(() => {
    fetch("/api/blogs")
      .then(r => r.json())
      .then((data: Blog[]) => {
        const sorted = data.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        setBlogs(sorted)
        setFiltered(sorted)
      })
  }, [])

  const handleFilterChange = (filters: { category?: string; tag?: string; date?: string }) => {
    let temp = blogs
    if (filters.category) temp = temp.filter(b => b.category === filters.category)
    if (filters.tag) temp = temp.filter(b => b.tags.includes(filters.tag))
    if (filters.date) {
      const [year, month] = filters.date.split("-")
      temp = temp.filter(b => {
        const d = new Date(b.publishedAt)
        return d.getFullYear() === +year && d.getMonth() + 1 === +month
      })
    }
    setFiltered(temp)
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 max-w-7xl mx-auto px-4 py-16">
      <FilterSidebar onFilterChange={handleFilterChange} />
      <div className="flex-1 grid gap-6 md:grid-cols-3">
        {filtered.map(blog => (
          <BlogCard
            key={blog._id}
            title={blog.title}
            excerpt={blog.excerpt}
            image={blog.coverImage}
            href={`/blog/${blog.slug}`}
          />
        ))}
      </div>
      
    </div>
  )
}
