import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-6 py-16 max-w-6xl mx-auto">
      {/* Text Section */}
      <div className="flex-1 text-center md:text-left space-y-5">
        <div>
        <h5 className="text-primary"> Welcome to</h5>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          <span className="text-primary">Nowshen’s Blog</span>
        </h1></div>
        <p className="text-muted-foreground text-lg max-w-lg mx-auto md:mx-0">
          Sharing insights on web development, design, and digital creativity.
          Stay inspired and build something amazing.
        </p>
        <div className="flex justify-center md:justify-start gap-3">
          <Button><Link href="/blog">Read Articles</Link></Button>
          <Button variant="outline">Subscribe</Button>
        </div>
      </div>

      {/* Image Section */}
      <div className="flex-1 mt-10 md:mt-0 flex justify-center">
        <Image
          src="/hero-illustration.svg"
          alt="Blog Hero"
          width={450}
          height={450}
          className="drop-shadow-lg dark:opacity-90"
        />
      </div>
    </section>
  )
}
