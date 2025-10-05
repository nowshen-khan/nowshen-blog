import { Button } from "@/components/ui/button"
import { Input } from "./ui/input"

export default function CTASection() {
  return (
    <section className="bg-background py-16">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
        <h2 className="text-3xl font-bold">Stay Updated!</h2>
        <p>Subscribe to our newsletter and never miss a new article.</p>
        <form className="flex flex-col md:flex-row justify-center gap-3 mt-4">
          <Input
            type="email"
            placeholder="Your email"
            className="rounded-md px-4 py-2 w-full md:w-auto"
          />
          <Button type="submit" className="w-full md:w-auto">Subscribe</Button>
        </form>
      </div>
    </section>
  )
}
