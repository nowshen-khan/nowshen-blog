"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Mail, 
  Phone, 
  Calendar,
  Eye,
  EyeOff,
  Reply,
  Archive,
  Trash2,
  Search,
  Filter
} from 'lucide-react'

interface Contact {
  _id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  service?: string
  status: 'new' | 'read' | 'replied' | 'closed'
  createdAt: string
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([])
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    fetchContacts()
  }, [])

  useEffect(() => {
    filterContacts()
  }, [contacts, searchTerm, statusFilter])

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contact')
      const data = await response.json()
      setContacts(data.contacts || [])
    } catch (error) {
      console.error('Failed to fetch contacts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterContacts = () => {
    let filtered = contacts

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.subject.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(contact => contact.status === statusFilter)
    }

    setFilteredContacts(filtered)
  }

  const updateContactStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        await fetchContacts()
        if (selectedContact?._id === id) {
          setSelectedContact(prev => prev ? { ...prev, status } : null)
        }
      }
    } catch (error) {
      console.error('Failed to update contact status:', error)
    }
  }

  const deleteContact = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact?')) return

    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        await fetchContacts()
        if (selectedContact?._id === id) {
          setSelectedContact(null)
        }
      }
    } catch (error) {
      console.error('Failed to delete contact:', error)
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      new: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
      read: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300',
      replied: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
      closed: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
    }
    return variants[status as keyof typeof variants] || variants.new
  }

  const getStatusIcon = (status: string) => {
    const icons = {
      new: EyeOff,
      read: Eye,
      replied: Reply,
      closed: Archive
    }
    return icons[status as keyof typeof icons] || EyeOff
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading contacts...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Contact Management</h1>
          <p className="text-muted-foreground">Manage customer inquiries and messages</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary">
            {contacts.filter(c => c.status === 'new').length} New
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contacts List */}
        <div className="lg:col-span-1 space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="all">All Status</option>
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Contacts */}
          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {filteredContacts.map((contact) => (
              <Card 
                key={contact._id} 
                className={`cursor-pointer hover:shadow-md transition-shadow ${
                  selectedContact?._id === contact._id ? 'border-primary' : ''
                }`}
                onClick={() => setSelectedContact(contact)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold truncate">{contact.name}</h3>
                    <Badge className={getStatusBadge(contact.status)}>
                      {contact.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2 truncate">
                    {contact.subject}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </div>
                    {contact.service && (
                      <Badge variant="outline" className="text-xs">
                        {contact.service}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredContacts.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <Mail className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No contacts found</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Contact Details */}
        <div className="lg:col-span-2">
          {selectedContact ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Contact Details</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusBadge(selectedContact.status)}>
                      {selectedContact.status}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteContact(selectedContact._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-muted-foreground">Name</Label>
                    <p className="font-medium">{selectedContact.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Email</Label>
                    <p className="font-medium">{selectedContact.email}</p>
                  </div>
                  {selectedContact.phone && (
                    <div>
                      <Label className="text-sm text-muted-foreground">Phone</Label>
                      <p className="font-medium">{selectedContact.phone}</p>
                    </div>
                  )}
                  {selectedContact.service && (
                    <div>
                      <Label className="text-sm text-muted-foreground">Service</Label>
                      <Badge variant="outline">{selectedContact.service}</Badge>
                    </div>
                  )}
                  <div>
                    <Label className="text-sm text-muted-foreground">Date</Label>
                    <p className="font-medium">
                      {new Date(selectedContact.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <Label className="text-sm text-muted-foreground">Subject</Label>
                  <p className="font-medium">{selectedContact.subject}</p>
                </div>

                {/* Message */}
                <div>
                  <Label className="text-sm text-muted-foreground">Message</Label>
                  <div className="mt-2 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <p className="whitespace-pre-wrap">{selectedContact.message}</p>
                  </div>
                </div>

                {/* Status Actions */}
                <div className="flex flex-wrap gap-2">
                  {['new', 'read', 'replied', 'closed'].map((status) => {
                    const StatusIcon = getStatusIcon(status)
                    return (
                      <Button
                        key={status}
                        variant={selectedContact.status === status ? "default" : "outline"}
                        size="sm"
                        onClick={() => updateContactStatus(selectedContact._id, status)}
                      >
                        <StatusIcon className="h-4 w-4 mr-2" />
                        Mark as {status}
                      </Button>
                    )
                  })}
                </div>

                {/* Reply Action */}
                <div>
                  <Button asChild>
                    <a href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}>
                      <Reply className="h-4 w-4 mr-2" />
                      Reply via Email
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Mail className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Select a Contact</h3>
                <p className="text-muted-foreground">
                  Choose a contact from the list to view details and manage the inquiry.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}