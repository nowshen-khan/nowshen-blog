import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

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
            <Link
              key={index}
              href={article.href}
              className="group block rounded-xl border border-border bg-card shadow-sm overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative w-full h-48">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {article.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {article.excerpt}
                </p>
                <Button size="sm" variant="outline">
                  Read More
                </Button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
