// components/hero/HeroSection.tsx
import HeroContent from '@/components/hero/HeroContent'
import HeroBackground from '@/components/hero/HeroBackground'
import HeroStats from '@/components/hero/HeroStats'
import ScrollIndicator from '@/components/hero/ScrollIndicator'
import { getSiteSettings } from '@/lib/site-settings'
import { cache } from 'react'

const cachedGetSiteSettings = cache(getSiteSettings)

export default async function HeroSection() {
    const siteSettings = await cachedGetSiteSettings()
  
   if (!siteSettings || !siteSettings.hero) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <p>Loading hero section...</p>
      </section>
    )
  }

  const { hero } = siteSettings
  return (
    <section 
      aria-label="Welcome section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <HeroBackground />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <HeroContent data={hero} />
          <HeroStats data={hero} />
        </div>
      </div>
      <ScrollIndicator />
    </section>
  )
}