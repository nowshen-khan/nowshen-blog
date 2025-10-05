import HeroSection from "@/components/HeroSection"
import FeaturedArticles from "@/components/FeaturedArticles"
import RecentArticles from "@/components/RecentArticles"
import CTASection from "@/components/CTASection"
import CategoryBlogSection from "@/components/CategoryBlogSection"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedArticles />
      {/* <main className="container py-12 space-y-12">
         <CategoryBlogSection category="tutorial" seeAllLink="/blogs/tutorial" />
      <CategoryBlogSection category="guide" seeAllLink="/blogs/guide" />
   </main> */}
      <RecentArticles />
      <CTASection />
    </>
  )
}
