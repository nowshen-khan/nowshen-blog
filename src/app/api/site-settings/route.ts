// app/api/site-settings/route.ts
import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import SiteSettings from '@/models/SiteSettings'

// GET site settings
export async function GET() {
  try {
    await connectDB()
    
    let settings = await SiteSettings.findOne()
    
    // If no settings exist, create default ones
    if (!settings) {
      settings = await SiteSettings.create({
        siteName: "Nowshen",
        title: "Nowshen - Web Developer & Blogger",
        description: "Personal blog about web development...",
        // ... default data
      })
    }
    
    return NextResponse.json(settings)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

// UPDATE site settings
export async function PUT(request: Request) {
  try {
    await connectDB()
    const body = await request.json()
    
    const settings = await SiteSettings.findOneAndUpdate(
      {},
      { $set: body },
      { new: true, upsert: true }
    )
    
    return NextResponse.json(settings)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}