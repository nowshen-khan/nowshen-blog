import Navbar from "@/components/Navbar"
import BlogFilter from "@/components/BlogFilter"
import { getBlogs } from "@/lib/helpers/blogs" 

// Static Blog
const blogPosts = [
  {
    title: "Learn Next.js 14 Fast",
    excerpt: "A complete guide to build modern apps with Next.js and TypeScript.",
    image: "/articles/nextjs.png",
    href: "/blog/nextjs-14",
  },
  {
    title: "Master Tailwind CSS",
    excerpt: "Tips and tricks to design stunning UIs using Tailwind CSS.",
    image: "/articles/tailwind.png",
    href: "/blog/tailwind-css",
  },
  {
    title: "React 18 Features",
    excerpt: "Explore the latest React 18 features and how to use them effectively.",
    image: "/articles/react18.png",
    href: "/blog/react-18",
  },
]

export default async function BlogPage() {
  const blogs = await getBlogs()
  
  
  

  return (
    <>
      
      <header className="py-16 bg-background text-center">
        <h1 className="text-4xl font-bold mb-2">Our Blog</h1>
        <p className="text-muted-foreground max-w-xl mx-auto">Read our latest articles, tutorials, and guides on web development and design.</p>
         
      </header>

      {/* Static Blog rendering */}
      {/* <main  className="max-w-6xl mx-auto px-6 py-16 grid gap-8 md:grid-cols-3">
        {blogPosts.map(post => (
          <BlogCard
            key={post.href}
            title={post.title}
            excerpt={post.excerpt}
            image={post.image}
            href={post.href}
          />
        ))}
        </main> */}
      
      {/* Dynamic/Database Blog rendering */}
        <BlogFilter blogs={blogs} />
     
    
    </>
  )
}
