import connectDB from '@/lib/mongodb'
import { Blog } from '@/models/Blog'
import { User } from '@/models/User'

export default async function AdminDashboard() {

  await connectDB()
  
  const [totalBlogs, publishedBlogs, totalUsers, recentBlogs] = await Promise.all([
    Blog.countDocuments(),
    Blog.countDocuments({ isPublished: true }),
    User.countDocuments(),
    Blog.find().sort({ createdAt: -1 }).limit(5).populate('author', 'name')
  ])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card rounded-lg p-6 border">
          <h3 className="text-lg font-semibold">Total Blogs</h3>
          <p className="text-2xl font-bold mt-2">{totalBlogs}</p>
        </div>
        <div className="bg-card rounded-lg p-6 border">
          <h3 className="text-lg font-semibold">Published</h3>
          <p className="text-2xl font-bold mt-2">{publishedBlogs}</p>
        </div>
        <div className="bg-card rounded-lg p-6 border">
          <h3 className="text-lg font-semibold">Total Users</h3>
          <p className="text-2xl font-bold mt-2">{totalUsers}</p>
        </div>
      </div>

      {/* Recent Blogs */}
      <div className="bg-card rounded-lg p-6 border">
        <h3 className="text-lg font-semibold mb-4">Recent Blogs</h3>
        <div className="space-y-4">
          {recentBlogs.map((blog: any) => (
            <div key={blog._id} className="flex justify-between items-center py-2 border-b">
              <div>
                <h4 className="font-medium">{blog.title}</h4>
                <p className="text-sm text-muted-foreground">
                  By {blog.author?.name || 'Unknown Author'} • {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                blog.isPublished 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
              }`}>
                {blog.isPublished ? 'Published' : 'Draft'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}