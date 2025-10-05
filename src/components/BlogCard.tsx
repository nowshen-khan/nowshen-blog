import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type BlogCardProps = {
  title: string
  excerpt: string
  image: string
  href: string
}

export default function BlogCard({ title, excerpt, image, href }: BlogCardProps) {
  return (
    <Link href={href} className="group block rounded-xl border border-border bg-card shadow-sm overflow-hidden transition-transform hover:-translate-y-1 hover:shadow-lg">
      <div className="relative w-full h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground mb-4 text-sm">{excerpt}</p>
        <Button size="sm" variant="outline">Read More</Button>
      </div>
    </Link>
  )
}
