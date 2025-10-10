// models/SiteSettings.ts
import mongoose from 'mongoose'

const SiteSettingsSchema = new mongoose.Schema({
  siteName: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  hero: {
    welcomeText: String,
    title: String,
    subtitle: String,
    description: String,
    expertise: [String],
    stats: [{
      icon: String,
      number: String,
      label: String
    }],
    buttons: {
      primary: { text: String, href: String },
      secondary: { text: String, href: String }
    }
  },
  socialLinks: {
    twitter: String,
    github: String,
    linkedin: String,
    email: String
  },
  seoSettings: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  }
}, { timestamps: true })

export default mongoose.models.SiteSettings || mongoose.model('SiteSettings', SiteSettingsSchema)