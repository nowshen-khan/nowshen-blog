"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowRight } from "lucide-react"

type Blog = {
  _id: string
  title: string
  slug: string
  coverImage?: string
  author?: {
    name: string
    image?: string
  }
  publishedAt?: string
  readingTime?: number
}

interface Props {
  category: string
  limit?: number
  seeAllLink?: string
}

export default function CategoryBlogSection({
  category,
  limit = 4,
  seeAllLink = "/blogs",
}: Props) {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch(`/api/blogs?category=${category}&limit=${limit}`)
        const data = await res.json()
        setBlogs(data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchBlogs()
  }, [category, limit])

  return (
    <section className="my-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold capitalize tracking-tight">
          {category}
        </h2>
        <Link
          href={seeAllLink}
          className="text-sm font-medium text-primary flex items-center gap-1 hover:underline"
        >
          See all <ArrowRight size={16} />
        </Link>
      </div>

      {/* Blogs Grid */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[...Array(limit)].map((_, i) => (
            <Skeleton key={i} className="w-full h-60 rounded-xl" />
          ))}
        </div>
      ) : blogs.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {blogs.map((blog) => (
            <Link
              key={blog._id}
              href={`/blogs/${blog.slug}`}
              className="group rounded-xl overflow-hidden border border-border hover:shadow-md transition"
            >
              <div className="relative aspect-video">
                <Image
                  src={blog.coverImage || "/placeholder.png"}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-base mb-2 group-hover:text-primary line-clamp-2">
                  {blog.title}
                </h3>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={blog.author?.image} />
                      <AvatarFallback>
                        {blog.author?.name?.charAt(0) || "A"}
                      </AvatarFallback>
                    </Avatar>
                    <span>{blog.author?.name || "Unknown"}</span>
                  </div>

                  <div className="text-xs text-muted-foreground text-right">
                    {blog.publishedAt
                      ? new Date(blog.publishedAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      : ""}
                    {blog.readingTime && (
                      <span> • {blog.readingTime} min read</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No blogs found in this category.</p>
      )}
    </section>
  )
}
