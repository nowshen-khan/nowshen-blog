// components/admin/SiteSettingsForm.tsx
'use client'

import { useState, useEffect } from 'react'
import { useSiteSettings } from '@/hooks/useSiteSettings'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function SiteSettingsForm() {
  const { settings, loading, updateSettings } = useSiteSettings()
  const [formData, setFormData] = useState({})
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (settings) {
      setFormData(settings)
    }
  }, [settings])

  const handleSave = async () => {
    setSaving(true)
    try {
      await updateSettings(formData)
      // Show success message
    } catch (error) {
      // Show error message
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div>Loading settings...</div>

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Site Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            label="Site Name"
            value={formData.siteName || ''}
            onChange={(e) => setFormData({...formData, siteName: e.target.value})}
          />
          <Input
            label="Site Title"
            value={formData.title || ''}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
          <Textarea
            label="Description"
            value={formData.description || ''}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Hero section fields */}
          <Input
            label="Welcome Text"
            value={formData.hero?.welcomeText || ''}
            onChange={(e) => setFormData({
              ...formData, 
              hero: {...formData.hero, welcomeText: e.target.value}
            })}
          />
          {/* Add more fields */}
        </CardContent>
      </Card>

      <Button onClick={handleSave} disabled={saving}>
        {saving ? 'Saving...' : 'Save Settings'}
      </Button>
    </div>
  )
}