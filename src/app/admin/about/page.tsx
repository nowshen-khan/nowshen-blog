"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Save, 
  User, 
  Settings, 
  Link, 
  Code,
  Plus,
  X
} from 'lucide-react'

interface AboutData {
  _id?: string
  title: string
  subtitle: string
  content: string
  image: string
  imageAlt: string
  experience: number
  projects: number
  clients: number
  skills: string[]
  socialLinks: {
    github?: string
    linkedin?: string
    twitter?: string
    email?: string
    website?: string
  }
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
    ogImage: string
  }
}
const defaultAboutData: AboutData = {
  title: '',
  subtitle: '',
  content: '',
  image: '',
  imageAlt: '',
  experience: 0,
  projects: 0,
  clients: 0,
  skills: [],
  socialLinks: {},
  seo: {
    metaTitle: '',
    metaDescription: '',
    keywords: [],
    ogImage: ''
  }
}

export default function AdminAboutPage() {
   const [aboutData, setAboutData] = useState<AboutData>(defaultAboutData)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [newSkill, setNewSkill] = useState('')
  const [newKeyword, setNewKeyword] = useState('')

  useEffect(() => {
    fetchAboutData()
  }, [])

  const fetchAboutData = async () => {
    try {
      const response = await fetch('/api/about')
         if (!response.ok) {
        throw new Error('Failed to fetch about data')
      }
      const data = await response.json()
        setAboutData({
        ...defaultAboutData,
        ...data,
        seo: {
          ...defaultAboutData.seo,
          ...(data.seo || {})
        },
        socialLinks: {
          ...defaultAboutData.socialLinks,
          ...(data.socialLinks || {})
        }
      })
    } catch (error) {
      console.error('Failed to fetch about data:', error)
        setAboutData(defaultAboutData)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      const response = await fetch('/api/about', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(aboutData),
      })

      if (response.ok) {
        alert('About page updated successfully!')
      } else {
        alert('Failed to update about page')
      }
    } catch (error) {
      console.error('Failed to update about page:', error)
      alert('Failed to update about page')
    } finally {
      setIsSaving(false)
    }
  }

  const addSkill = () => {
    if (newSkill.trim() && !aboutData.skills.includes(newSkill.trim())) {
      setAboutData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }))
      setNewSkill('')
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setAboutData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }))
  }

  const addKeyword = () => {
    if (newKeyword.trim() && !aboutData.seo.keywords.includes(newKeyword.trim())) {
      setAboutData(prev => ({
        ...prev,
        seo: {
          ...prev.seo,
          keywords: [...prev.seo.keywords, newKeyword.trim()]
        }
      }))
      setNewKeyword('')
    }
  }

  const removeKeyword = (keywordToRemove: string) => {
    setAboutData(prev => ({
      ...prev,
      seo: {
        ...prev.seo,
        keywords: prev.seo.keywords.filter(keyword => keyword !== keywordToRemove)
      }
    }))
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">About Page Editor</h1>
          <p className="text-muted-foreground">Manage your professional about page content</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving} className="gap-2">
          <Save className="w-4 h-4" />
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <Tabs defaultValue="content" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content" className="gap-2">
            <User className="w-4 h-4" />
            Content
          </TabsTrigger>
          <TabsTrigger value="social" className="gap-2">
            <Link className="w-4 h-4" />
            Social & Stats
          </TabsTrigger>
          <TabsTrigger value="seo" className="gap-2">
            <Settings className="w-4 h-4" />
            SEO Settings
          </TabsTrigger>
        </TabsList>

        {/* Content Tab */}
        <TabsContent value="content">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={aboutData.title}
                    onChange={(e) => setAboutData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="About Me"
                  />
                </div>

                <div>
                  <Label htmlFor="subtitle">Subtitle</Label>
                  <Input
                    id="subtitle"
                    value={aboutData.subtitle}
                    onChange={(e) => setAboutData(prev => ({ ...prev, subtitle: e.target.value }))}
                    placeholder="Brief professional description"
                  />
                </div>

                <div>
                  <Label htmlFor="image">Profile Image URL</Label>
                  <Input
                    id="image"
                    value={aboutData.image}
                    onChange={(e) => setAboutData(prev => ({ ...prev, image: e.target.value }))}
                    placeholder="/profile.jpg"
                  />
                </div>

                <div>
                  <Label htmlFor="imageAlt">Image Alt Text</Label>
                  <Input
                    id="imageAlt"
                    value={aboutData.imageAlt}
                    onChange={(e) => setAboutData(prev => ({ ...prev, imageAlt: e.target.value }))}
                    placeholder="Professional portrait"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>About Content</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={aboutData.content}
                  onChange={(e) => setAboutData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Write your professional story and experience..."
                  rows={12}
                  className="min-h-[200px]"
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Social & Stats Tab */}
        <TabsContent value="social">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Professional Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="experience">Experience (Years)</Label>
                    <Input
                      id="experience"
                      type="number"
                      value={aboutData.experience}
                      onChange={(e) => setAboutData(prev => ({ ...prev, experience: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="projects">Projects</Label>
                    <Input
                      id="projects"
                      type="number"
                      value={aboutData.projects}
                      onChange={(e) => setAboutData(prev => ({ ...prev, projects: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="clients">Clients</Label>
                    <Input
                      id="clients"
                      type="number"
                      value={aboutData.clients}
                      onChange={(e) => setAboutData(prev => ({ ...prev, clients: parseInt(e.target.value) || 0 }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-4 h-4" />
                  Skills & Technologies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                  />
                  <Button onClick={addSkill} type="button" size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {aboutData.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {skill}
                      <button
                        type="button"
                        onClick={() => removeSkill(skill)}
                        className="hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Social Links</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries({
                    github: 'GitHub URL',
                    linkedin: 'LinkedIn URL',
                    twitter: 'Twitter URL',
                    email: 'Email Address',
                    website: 'Website URL'
                  }).map(([key, label]) => (
                    <div key={key}>
                      <Label htmlFor={key}>{label}</Label>
                      <Input
                        id={key}
                        type={key === 'email' ? 'email' : 'url'}
                        value={aboutData.socialLinks[key as keyof typeof aboutData.socialLinks] || ''}
                        onChange={(e) => setAboutData(prev => ({
                          ...prev,
                          socialLinks: { ...prev.socialLinks, [key]: e.target.value }
                        }))}
                        placeholder={key === 'email' ? 'your@email.com' : `https://${key}.com/username`}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* SEO Tab */}
        <TabsContent value="seo">
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input
                    id="metaTitle"
                    value={aboutData.seo.metaTitle}
                    onChange={(e) => setAboutData(prev => ({
                      ...prev,
                      seo: { ...prev.seo, metaTitle: e.target.value }
                    }))}
                    placeholder="About Me - Professional Profile"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {aboutData.seo.metaTitle.length}/60 characters
                  </p>
                </div>

                <div>
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    value={aboutData.seo.metaDescription}
                    onChange={(e) => setAboutData(prev => ({
                      ...prev,
                      seo: { ...prev.seo, metaDescription: e.target.value }
                    }))}
                    placeholder="Learn about my professional journey and expertise..."
                    rows={3}
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    {aboutData.seo.metaDescription.length}/160 characters
                  </p>
                </div>

                <div>
                  <Label htmlFor="ogImage">Open Graph Image</Label>
                  <Input
                    id="ogImage"
                    value={aboutData.seo.ogImage}
                    onChange={(e) => setAboutData(prev => ({
                      ...prev,
                      seo: { ...prev.seo, ogImage: e.target.value }
                    }))}
                    placeholder="/og-about.jpg"
                  />
                </div>

                <div>
                  <Label>Keywords</Label>
                  <div className="flex gap-2 mb-2">
                    <Input
                      value={newKeyword}
                      onChange={(e) => setNewKeyword(e.target.value)}
                      placeholder="Add a keyword"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword())}
                    />
                    <Button onClick={addKeyword} type="button" size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {aboutData.seo.keywords.map((keyword, index) => (
                      <Badge key={index} variant="secondary" className="gap-1">
                        {keyword}
                        <button
                          type="button"
                          onClick={() => removeKeyword(keyword)}
                          className="hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}