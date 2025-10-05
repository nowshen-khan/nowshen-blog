import BlogCard from "./BlogCard"

type Article = {
  title: string
  excerpt: string
  image: string
  href: string
}

const articles: Article[] = [
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
   {
    title: "Learn Next.js Fast",
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

export default function FeaturedArticles() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-10 text-center md:text-left">
          Featured Articles
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {articles.map((article, index) => (
              <BlogCard key={index} {...article} />
          ))}
        </div>
      </div>
    </section>
  )
}
