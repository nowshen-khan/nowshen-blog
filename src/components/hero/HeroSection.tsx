// components/hero/HeroSection.tsx
import HeroContent from '@/components/hero/HeroContent'
import HeroBackground from '@/components/hero/HeroBackground'
import HeroStats from '@/components/hero/HeroStats'
import ScrollIndicator from '@/components/hero/ScrollIndicator'
import { heroData } from '@/data/site-data'
import { getSiteSettings } from '@/lib/site-settings'

export default async function HeroSection() {
    const siteSettings = await getSiteSettings()
  
  if (!siteSettings) {
    return <div>Loading...</div>
  }
  return (
    <section 
      aria-label="Welcome section"
      className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden"
    >
      <HeroBackground />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <HeroContent data={siteSettings.hero} />
          <HeroStats data={siteSettings.hero} />
        </div>
      </div>

      <ScrollIndicator />
    </section>
  )
}