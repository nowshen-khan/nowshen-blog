// src/lib/blogs.ts
export type Blog = {
  _id: string
  title: string
  slug: string
  excerpt: string
  coverImage: string
  category: string
  tags: string[]
  readingTime: number
}

export async function getBlogs(): Promise<Blog[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`)
  if (!res.ok) throw new Error("Failed to fetch blogs")
  const data: Blog[] = await res.json()
  return data
}
