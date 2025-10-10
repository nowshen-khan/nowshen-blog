// app/admin/blogs/page.tsx
import Link from 'next/link'
import { Blog } from '@/models/Blog'
import connectDB from '@/lib/mongodb'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { 
  Plus, 
  Eye, 
  Edit, 
  Trash2,
  FileText 
} from 'lucide-react'

export default async function BlogsList() {
  await connectDB()
  
  const blogs = await Blog.find()
    .sort({ createdAt: -1 })
    .populate('author', 'name')
    .lean()

  return (
    <div className="flex-1 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Management</h1>
          <p className="text-muted-foreground">
            Create, edit and manage your blog posts
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/blogs/new">
            <Plus className="mr-2 h-4 w-4" />
            New Blog
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Blogs ({blogs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.map((blog) => (
                <TableRow key={blog._id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium line-clamp-1">{blog.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {blog.readingTime} min read
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{blog.author.name}</TableCell>
                  <TableCell>
                    <Badge variant={blog.isPublished ? "default" : "secondary"}>
                      {blog.isPublished ? 'Published' : 'Draft'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {blog.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3 text-muted-foreground" />
                      <span>{blog.views || 0}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/blog/${blog.slug}`} target="_blank">
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/blogs/${blog._id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {blogs.length === 0 && (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No blogs found</h3>
              <p className="text-muted-foreground mt-2">
                Get started by creating your first blog post.
              </p>
              <Button asChild className="mt-4">
                <Link href="/admin/blogs/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New Blog
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}