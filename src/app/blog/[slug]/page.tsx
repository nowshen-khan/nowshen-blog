import Navbar from "@/components/Navbar"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { BlogRenderer } from "@/components/BlogRenderer"
import { calculateReadingTime } from "@/lib/blogUtils"
import { Metadata } from "next"

type Blog = {
  title: string
  contentBlocks: any[]
  coverImage: string
  publishedAt: string
  tags: string[]
  excerpt: string
  slug: string
}

// SEO metadata
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const blog = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${params.slug}`).then(res => res.json())
  return {
    title: blog.title,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: "article",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${blog.slug}`,
      images: [blog.coverImage],
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.excerpt,
      images: [blog.coverImage],
    },
  }
}


interface Props {
  params: { slug: string }
}


// Static blog type
type SingleArticleProps = {
  title: string
  content: string
  image: string
  date?: string
}

// Static blog rendering
export function SingleArticlePage({ title, content, image, date }: SingleArticleProps) {
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        {date && <p className="text-muted-foreground mb-4">{date}</p>}

        <div className="relative w-full h-80 mb-6 rounded-xl overflow-hidden shadow-md">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>

        <article className="prose dark:prose-invert max-w-full">
          <p>{content}</p>
          {/* More paragraphs, headings, lists, code, etc. */}
        </article>

        <div className="mt-10">
          <Button asChild>
            <a href="/blog">Back to Blog</a>
          </Button>
        </div>
      </main>
    </>
  )
}

// Dynamic blog rendering
async function getBlog(slug: string): Promise<Blog> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs/${slug}`)
  const data = await res.json()
  return data
}

export default async function SingleBlogPage({ params }: Props) {
  const blog = await getBlog(params.slug)

  const readingTime = calculateReadingTime(blog.contentBlocks)
  return (
    <>
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <p className="text-muted-foreground mb-4">  {new Date(blog.publishedAt).toLocaleDateString()} • {readingTime} min read</p>

        <div className="relative w-full h-80 mb-6 rounded-xl overflow-hidden shadow-md">
          <Image src={blog.coverImage} alt={blog.title} className="object-cover w-full h-full"  width={100} height={80}/>
        </div>

        <BlogRenderer contentBlocks={blog.contentBlocks} />
          <div className="flex flex-wrap gap-2 mt-6">
          {blog.tags.map(tag => (
            <span key={tag} className="px-2 py-1 border rounded-md text-sm">{tag}</span>
          ))}
        </div>
      </main>
    </>
  )
}