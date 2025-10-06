import HeroSection from "@/components/HeroSection"
import FeaturedArticles from "@/components/FeaturedArticles"
import RecentArticles from "@/components/RecentArticles"
import CTASection from "@/components/CTASection"
import BlogSection from "@/components/BlogSection"

export default function HomePage() {
  return (
    <>
      <HeroSection />
            {/* Featured */}
<BlogSection title="🌟 Featured Articles" type="featured" limit={3} />
{/* Recent */}
<BlogSection title="📰 Latest Articles" type="recent" limit={4} />
{/* Category */}
<BlogSection title="🌿 Plant Blogs" type="category" value="guide" limit={6} />
{/* Tag */}
<BlogSection title="#Tailwind Tips" type="tag" value="tailwind" />
{/* Search */}
<BlogSection title="Search Results" type="search" value="nextjs" showViewAll={false} />
      <FeaturedArticles />
      <RecentArticles />
      <CTASection />


    </>
  )
}
