import { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Search, 
  Tag,
  Filter
} from 'lucide-react';
import connectDB from '@/lib/mongodb';
import { Blog } from '@/models/Blog';
import { Suspense } from 'react';
import SearchBar from '@/components/SearchBar';
import BlogList from '@/components/blog/BlogList';
import TagLink  from '@/components/TagLink';
import CategoryLink from '@/components/CategoryLink';
import { siteConfig } from '@/data/site-data'

export const metadata: Metadata = {
  title: `Blog - ${siteConfig.name}`,
  description: 'Explore articles about web development, programming tips, and technology insights.',
  openGraph: {
    title: `Blog - ${siteConfig.name}`,
    description: 'Technical articles and tutorials about web development.',
  },
}

interface BlogPageProps {
  searchParams: {
    category?: string;
    tag?: string;
    search?: string;
    page?: string;
  }
}

interface BlogFilter {
  isPublished: boolean;
  category?: string;
  tags?: { $in: string[] };
  $or?: Record<string, unknown>[];
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  await connectDB();
  
    const { category = '', tag = '', search = '', page = '1' } = await searchParams;
  const currentPage = parseInt(page);
  const limit = 9;
  const skip = (currentPage - 1) * limit;

  // Build filter
  const filter: BlogFilter = { isPublished: true };
  
  if (category) {
    filter.category = category;
  }
  
  if (tag) {
    filter.tags = { $in: [tag] };
  }
  
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } },
      { excerpt: { $regex: search, $options: 'i' } },
      { tags: { $in: [new RegExp(search, 'i')] } }
    ];
  }

  const [blogs, totalBlogs, categories] = await Promise.all([
    Blog.find(filter)
      .populate('author', 'name image')
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Blog.countDocuments(filter),
    Blog.distinct('category', { isPublished: true })
  ]);

  const totalPages = Math.ceil(totalBlogs / limit);
  const popularTags = await Blog.aggregate([
    { $match: { isPublished: true } },
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              Our Blog
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Discover articles, tutorials, and insights about technology, programming, 
              and life experiences from our team.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Search */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* SearchBar component তৈরি করতে হবে যা client-side এ কাজ করবে */}
                  <SearchBar initialSearch={search} placeholder='Search for articles...' />
                </CardContent>
              </Card>

              {/* Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Filter className="w-4 h-4 mr-2" />
                    Categories
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                     <CategoryLink 
                      category={null} 
                      currentCategory={category}
                      className="w-full justify-start"
                    >
                      All Categories
                    </CategoryLink>


                    {/* <Button
                      variant={!category ? "default" : "ghost"}
                      size="sm"
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href="/blog">All Categories</Link>
                    </Button> */}
                    {categories.map((cat) => (
                      // <Button
                      //   key={cat}
                      //   variant={category === cat ? "default" : "ghost"}
                      //   size="sm"
                      //   className="w-full justify-start capitalize"
                      //   asChild
                      // >
                      //   <Link href={`/blog?category=${cat}`}>
                      //     {cat}
                      //   </Link>
                      // </Button>
                       <CategoryLink
                        key={cat}
                        category={cat}
                        currentCategory={category}
                        className="w-full justify-start capitalize"
                      >
                        {cat}
                      </CategoryLink>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Popular Tags */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Tag className="w-4 h-4 mr-2" />
                    Popular Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {popularTags.map((tagItem) => (
                      // <Badge
                      //   key={tagItem._id}
                      //   variant={tag === tagItem._id ? "default" : "outline"}
                      //   className="cursor-pointer"
                      //   asChild
                      // >
                      //   <Link href={`/blog?tag=${tagItem._id}`}>
                      //     {tagItem._id} ({tagItem.count})
                      //   </Link>
                      // </Badge>
                       <TagLink
                        key={tagItem._id}
                        tag={tagItem._id}
                        currentTag={tag}
                        count={tagItem.count}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Featured Posts */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Featured Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {(await Blog.find({ isPublished: true, isFeatured: true })
                      .populate('author', 'name')
                      .sort({ publishedAt: -1 })
                      .limit(3)
                    ).map((blog: any) => (
                      <Link
                        key={blog._id}
                        href={`/blog/${blog.slug}`}
                        className="block group"
                      >
                        <div className="flex items-start space-x-3">
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                              {blog.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(blog.publishedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Blog Posts */}
            <div className="lg:col-span-3">
               <Suspense fallback={<BlogListSkeleton />}>
                <BlogList 
                  blogs={JSON.parse(JSON.stringify(blogs))} // Serialize for client component
                  totalBlogs={totalBlogs}
                  category={category}
                  tag={tag}
                  search={search}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  searchParams={searchParams}
                />
              </Suspense>
             
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


function BlogListSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-gray-200 rounded-lg h-80"></div>
        ))}
      </div>
    </div>
  );
}