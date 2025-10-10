import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Calendar, 
  User, 
  Clock,
  Eye,
  Heart,
  Tag,
  ArrowLeft,
  Share2,
  Bookmark
} from 'lucide-react';
import connectDB from '@/lib/mongodb';
import { Blog } from '@/models/Blog';

interface BlogPostProps {
  params: {
    slug: string;
  }
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  await connectDB();
  
  const {slug} = await params;
  const blog = await Blog.findOne({ 
    slug, 
    isPublished: true 
  }).populate('author', 'name');

   const baseUrl = process.env.DEV ? process.env.Next_DEV_SITE_URL : process.env.NEXT_PUBLIC_SITE_URL

  if (!blog) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
        metadataBase: new URL(baseUrl),
    };
  }

  return {
       metadataBase: new URL(baseUrl),
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || blog.excerpt,
    keywords: blog.tags,
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || blog.excerpt,
      type: 'article',
      publishedTime: blog.publishedAt?.toISOString(),
      authors: [blog.author.name],
      images: [
        {
          url: blog.coverImage,
          width: 1200,
          height: 630,
          alt: blog.coverImageAlt || blog.title,
        },
      ],
    },
  };
}

export default async function BlogPost({ params }: BlogPostProps) {
  await connectDB();
  
  const {slug} = await params;
  const blog = await Blog.findOne({ 
    slug, 
    isPublished: true 
  }).populate('author', 'name image');

  if (!blog) {
    notFound();
  }

  // Increment view count
  await Blog.findByIdAndUpdate(blog._id, { $inc: { views: 1 } });

  // Get related posts
  const relatedPosts = await Blog.find({
    _id: { $ne: blog._id },
    category: blog.category,
    isPublished: true
  })
    .populate('author', 'name')
    .sort({ publishedAt: -1 })
    .limit(3);

  const renderContentBlock = (block: any, index: number) => {
    switch (block.type) {
      case 'heading':
        const HeadingTag = `h${block.level || 2}` as keyof JSX.IntrinsicElements;
        return (
          <HeadingTag 
            key={index}
            className={`mt-8 mb-4 font-bold text-slate-900 dark:text-slate-100 ${
              block.level === 1 ? 'text-4xl' :
              block.level === 2 ? 'text-3xl' :
              block.level === 3 ? 'text-2xl' :
              'text-xl'
            }`}
          >
            {block.content}
          </HeadingTag>
        );

      case 'paragraph':
        return (
          <p key={index} className="mb-6 text-slate-700 dark:text-slate-300 leading-relaxed">
            {block.content}
          </p>
        );

      case 'image':
        return (
          <div key={index} className="my-8">
            <div className="relative aspect-video rounded-lg overflow-hidden">
              <Image
                src={block.url || ''}
                alt={block.alt || ''}
                fill
                className="object-cover"
              />
            </div>
            {block.caption && (
              <p className="text-sm text-muted-foreground text-center mt-2">
                {block.caption}
              </p>
            )}
          </div>
        );

      case 'code':
        return (
          <pre key={index} className="my-6 p-4 bg-slate-900 text-slate-100 rounded-lg overflow-x-auto">
            <code className={`language-${block.language || 'text'}`}>
              {block.content}
            </code>
          </pre>
        );

      case 'list':
        return (
          <ul key={index} className="my-6 space-y-2">
            {block.items?.map((item: string, itemIndex: number) => (
              <li key={itemIndex} className="flex items-start">
                <span className="text-primary mr-2">•</span>
                <span className="text-slate-700 dark:text-slate-300">{item}</span>
              </li>
            ))}
          </ul>
        );

      case 'quote':
        return (
          <blockquote key={index} className="my-8 pl-6 border-l-4 border-primary italic text-slate-600 dark:text-slate-400">
            {block.content}
          </blockquote>
        );

      case 'video':
        return (
          <div key={index} className="my-8">
            <div className="aspect-video rounded-lg overflow-hidden">
              <video
                src={block.url}
                controls
                className="w-full h-full"
              />
            </div>
            {block.caption && (
              <p className="text-sm text-muted-foreground text-center mt-2">
                {block.caption}
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            <Button variant="ghost" asChild>
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Bookmark className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Article */}
      <article className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <header className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 capitalize">
              {blog.category}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              {blog.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              {blog.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                {blog.author.name}
              </div>
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                {blog.readingTime} min read
              </div>
              <div className="flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                {blog.views + 1} views
              </div>
              <div className="flex items-center">
                <Heart className="w-4 h-4 mr-2" />
                {blog.likes} likes
              </div>
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {blog.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline" asChild>
                    <Link href={`/blog?tag=${tag}`}>
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Link>
                  </Badge>
                ))}
              </div>
            )}
          </header>

          {/* Cover Image */}
          <div className="relative aspect-video rounded-xl overflow-hidden mb-12">
            <Image
              src={blog.coverImage}
              alt={blog.coverImageAlt || blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="prose prose-slate dark:prose-invert max-w-none">
            {blog.contentBlocks.map((block: any, index: number) => 
              renderContentBlock(block, index)
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between mt-12 pt-8 border-t">
            <Button variant="outline" asChild>
              <Link href="/blog">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
            <div className="flex items-center space-x-2">
              <Button>
                <Heart className="w-4 h-4 mr-2" />
                Like ({blog.likes})
              </Button>
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-slate-50 dark:bg-slate-900">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((post: any) => (
                <Card key={post._id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <Badge variant="secondary" className="mb-3 capitalize text-xs">
                      {post.category}
                    </Badge>
                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="font-semibold text-lg mb-2 hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{post.author.name}</span>
                      <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}