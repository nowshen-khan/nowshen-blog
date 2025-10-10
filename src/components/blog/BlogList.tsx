'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  User, 
  Clock,
  Eye,
  Heart,
  Tag as TagIcon
} from 'lucide-react';

interface Blog {
  _id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  coverImageAlt?: string;
  category: string;
  tags: string[];
  author: {
    name: string;
    image?: string;
  };
  publishedAt: string;
  readingTime: number;
  views: number;
  likes: number;
  slug: string;
}

interface BlogListProps {
  blogs: Blog[];
  totalBlogs: number;
  category?: string;
  tag?: string;
  search?: string;
  currentPage: number;
  totalPages: number;
  searchParams: any;
}

export default function BlogList({
  blogs,
  totalBlogs,
  category,
  tag,
  search,
  currentPage,
  totalPages,
  searchParams
}: BlogListProps) {
  const [displayBlogs, setDisplayBlogs] = useState(blogs);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animation when blogs change
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setDisplayBlogs(blogs);
      setIsAnimating(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [blogs]);

  return (
    <>
      {/* Results Info */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold">
            {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Articles` : 'All Articles'}
          </h2>
          <p className="text-muted-foreground">
            {totalBlogs} article{totalBlogs !== 1 ? 's' : ''} found
            {search && ` for "${search}"`}
            {tag && ` tagged with "${tag}"`}
          </p>
        </div>
      </div>

      {/* Blog Grid */}
      {displayBlogs.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-4">
              {search || tag || category 
                ? 'Try adjusting your search or filters to find what you\'re looking for.'
                : 'No articles have been published yet. Check back soon!'
              }
            </p>
            {(search || tag || category) && (
              <Button asChild>
                <Link href="/blog">View All Articles</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        <>
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 transition-all duration-500 ${
            isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
          }`}>
            {displayBlogs.map((blog) => (
              <Card 
                key={blog._id} 
                className="group hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <CardHeader className="p-0">
                  <Link href={`/blog/${blog.slug}`}>
                    <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <img
                        src={blog.coverImage}
                        alt={blog.coverImageAlt || blog.title}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="capitalize">
                          {blog.category}
                        </Badge>
                      </div>
                    </div>
                  </Link>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Metadata */}
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center">
                        <User className="w-3 h-3 mr-1" />
                        {blog.author.name}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(blog.publishedAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {blog.readingTime} min read
                      </div>
                    </div>

                    {/* Title & Excerpt */}
                    <div>
                      <Link href={`/blog/${blog.slug}`}>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {blog.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {blog.excerpt}
                      </p>
                    </div>

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {blog.tags.slice(0, 3).map((tag: string) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                            asChild
                          >
                            <Link href={`/blog?tag=${tag}`}>
                              <TagIcon className="w-3 h-3 mr-1" />
                              {tag}
                            </Link>
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Stats */}
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Eye className="w-3 h-3 mr-1" />
                          {blog.views}
                        </div>
                        <div className="flex items-center">
                          <Heart className="w-3 h-3 mr-1" />
                          {blog.likes}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" asChild>
                        <Link href={`/blog/${blog.slug}`}>
                          Read More
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pagination - Client Side */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2">
              <PaginationButton
                disabled={currentPage === 1}
                page={currentPage - 1}
                searchParams={searchParams}
              >
                Previous
              </PaginationButton>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <PaginationButton
                  key={pageNum}
                  page={pageNum}
                  searchParams={searchParams}
                  isActive={currentPage === pageNum}
                >
                  {pageNum}
                </PaginationButton>
              ))}

              <PaginationButton
                disabled={currentPage === totalPages}
                page={currentPage + 1}
                searchParams={searchParams}
              >
                Next
              </PaginationButton>
            </div>
          )}
        </>
      )}
    </>
  );
}

// Client-side pagination button component
function PaginationButton({
  children,
  page,
  searchParams,
  disabled = false,
  isActive = false
}: {
  children: React.ReactNode;
  page: number;
  searchParams: any;
  disabled?: boolean;
  isActive?: boolean;
}) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (disabled) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    
    router.push(`/blog?${params.toString()}`, { scroll: false });
  };

  if (disabled) {
    return (
      <Button variant="outline" disabled>
        {children}
      </Button>
    );
  }

  return (
    <Button
      variant={isActive ? "default" : "outline"}
      onClick={handleClick}
      className={isActive ? 'animate-pulse' : ''}
    >
      {children}
    </Button>
  );
}