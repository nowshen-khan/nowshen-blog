// models/SiteSettings.ts
import mongoose from 'mongoose'

const SiteSettingsSchema = new mongoose.Schema({
  siteName: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },

   // Navbar data
  navbar: {
    logoText: { type: String, default: "Nowshen.blog" },
    links: [{
      name: String,
      href: String,
      exact: Boolean
    }]
  },

  // Footer data
  footer: {
    aboutText: { type: String },
    phone: { type: String },
    email: { type: String },
    address: { type: String },
    columns: [{
      title: String,
      links: [{ label: String, href: String }]
    }]
  },

  socialLinks: {
    twitter: String,
    github: String,
    linkedin: String,
    instagram: String,
    facebook: String,
    email: String
  },
  hero: {
    startYear: { type: Number, default: 2024 },
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
  seoSettings: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  }
}, { timestamps: true })

export default mongoose.models.SiteSettings || mongoose.model('SiteSettings', SiteSettingsSchema)