// lib/site-settings.ts
import connectDB from './mongodb'
import SiteSettings from '@/models/SiteSettings'

export async function getSiteSettings() {
  try {
    await connectDB()
    
    let settings = await SiteSettings.findOne()
    
    if (!settings) {
      // Create default settings if none exist
      settings = await SiteSettings.create({
        siteName: "Nowshen",
        title: "Nowshen - Web Developer & Blogger",
        description: "Personal blog about web development, programming tips, and tech journey",
        hero: {
          welcomeText: "Welcome to My Digital Space",
          title: "Hi, I'm Nowshen",
          subtitle: "Web Developer & Blogger",
          description: "I write about web development, programming tips, and share my journey in tech...",
          expertise: ['JavaScript', 'React', 'Next.js', 'TypeScript', 'Node.js'],
          stats: [
            { icon: 'FileText', number: '50+', label: 'Articles Written' },
            { icon: 'Users', number: '3+', label: 'Years Experience' },
            { icon: 'Clock', number: 'Weekly', label: 'New Content' },
          ],
          buttons: {
            primary: { text: "Read My Blog", href: "/blog" },
            secondary: { text: "My Journey", href: "/about" }
          }
        }
      })
    }
    
    return JSON.parse(JSON.stringify(settings))
  } catch (error) {
    console.error('Failed to fetch site settings:', error)
    return null
  }
}