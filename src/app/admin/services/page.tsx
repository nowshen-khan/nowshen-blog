"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X,
} from 'lucide-react'

interface Service {
  _id?: string
  title: string
  slug: string
  description: string
  icon: string
  features: string[]
  price?: number
  priceType: 'one-time' | 'monthly' | 'yearly' | 'free'
  duration?: string
  isActive: boolean
  order: number
  image?: string
  seo: {
    metaTitle: string
    metaDescription: string
    keywords: string[]
  }
}
type PriceType = "one-time" | "monthly" | "yearly" | "free"
export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [editingService, setEditingService] = useState<Service | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [newFeature, setNewFeature] = useState('')

  useEffect(() => {
    fetchServices()
  }, [])

  const fetchServices = async () => {
    try {
      const response = await fetch('/api/services')
      const data = await response.json()
      setServices(data)
    } catch (error) {
      console.error('Failed to fetch services:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async (service: Service) => {
    setIsSaving(true)
    try {
      const url = service._id ? `/api/services/${service._id}` : '/api/services'
      const method = service._id ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(service),
      })

      if (response.ok) {
        await fetchServices()
        setEditingService(null)
        alert('Service saved successfully!')
      } else {
        alert('Failed to save service')
      }
    } catch (error) {
      console.error('Failed to save service:', error)
      alert('Failed to save service')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return

    try {
      const response = await fetch(`/api/services/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchServices()
        alert('Service deleted successfully!')
      } else {
        alert('Failed to delete service')
      }
    } catch (error) {
      console.error('Failed to delete service:', error)
      alert('Failed to delete service')
    }
  }

  const addFeature = () => {
    if (newFeature.trim() && editingService) {
      setEditingService(prev => prev ? {
        ...prev,
        features: [...prev.features, newFeature.trim()]
      } : null)
      setNewFeature('')
    }
  }

  const removeFeature = (featureToRemove: string) => {
    if (editingService) {
      setEditingService(prev => prev ? {
        ...prev,
        features: prev.features.filter(feature => feature !== featureToRemove)
      } : null)
    }
  }

  const newService: Service = {
    title: '',
    slug: '',
    description: '',
    icon: '🛠️',
    features: [],
    price: 0,
    priceType: 'one-time',
    isActive: true,
    order: services.length,
    seo: {
      metaTitle: '',
      metaDescription: '',
      keywords: []
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading services...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Services Management</h1>
          <p className="text-muted-foreground">Manage your service offerings</p>
        </div>
        <Button onClick={() => setEditingService(newService)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Services List */}
        <div className="lg:col-span-2 space-y-4">
          {services.map((service) => (
            <Card key={service._id} className="group hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="text-2xl mt-1">{service.icon}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg truncate">{service.title}</h3>
                        <Badge variant={service.isActive ? "default" : "secondary"}>
                          {service.isActive ? 'Active' : 'Inactive'}
                        </Badge>
                        <Badge variant="outline">
                          {service.priceType}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {service.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {service.features.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{service.features.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingService(service)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(service._id!)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Edit Form */}
        <div className="space-y-6">
          {editingService && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {editingService._id ? 'Edit Service' : 'New Service'}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setEditingService(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={editingService.title}
                    onChange={(e) => setEditingService(prev => prev ? {
                      ...prev,
                      title: e.target.value
                    } : null)}
                    placeholder="Service title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={editingService.description}
                    onChange={(e) => setEditingService(prev => prev ? {
                      ...prev,
                      description: e.target.value
                    } : null)}
                    placeholder="Service description"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="icon">Icon</Label>
                    <Input
                      id="icon"
                      value={editingService.icon}
                      onChange={(e) => setEditingService(prev => prev ? {
                        ...prev,
                        icon: e.target.value
                      } : null)}
                      placeholder="🛠️"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="order">Order</Label>
                    <Input
                      id="order"
                      type="number"
                      value={editingService.order}
                      onChange={(e) => setEditingService(prev => prev ? {
                        ...prev,
                        order: parseInt(e.target.value) || 0
                      } : null)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price</Label>
                    <Input
                      id="price"
                      type="number"
                      value={editingService.price || ''}
                      onChange={(e) => setEditingService(prev => prev ? {
                        ...prev,
                        price: e.target.value ? parseFloat(e.target.value) : undefined
                      } : null)}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="priceType">Price Type</Label>
                    <select
                      id="priceType"
                      value={editingService.priceType}
                      onChange={(e) => setEditingService(prev => prev ? {
                        ...prev,
                        priceType: e.target.value as PriceType 
                      } : null)}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="one-time">One-time</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                      <option value="free">Free</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Features</Label>
                  <div className="flex gap-2">
                    <Input
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Add a feature"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    />
                    <Button onClick={addFeature} type="button" size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {editingService.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="gap-1">
                        {feature}
                        <button
                          type="button"
                          onClick={() => removeFeature(feature)}
                          className="hover:text-destructive"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={editingService.isActive}
                    onChange={(e) => setEditingService(prev => prev ? {
                      ...prev,
                      isActive: e.target.checked
                    } : null)}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>

                <Button 
                  onClick={() => handleSave(editingService)} 
                  className="w-full"
                  disabled={isSaving}
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? 'Saving...' : 'Save Service'}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}