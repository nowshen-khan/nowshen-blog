// components/hero/HeroStats.tsx
import { FileText, Users, Clock } from 'lucide-react'

const iconMap = {
  FileText,
  Users,
  Clock,
}

interface HeroStatsProps {
  data: {
    stats: {
      icon: string;
      number: string;
      label: string;
    }[];
  }
}

export default function HeroStats({ data }: HeroStatsProps) {
  return (
    <div className="lg:pl-12">
      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-8 p-8 bg-background/50 backdrop-blur-sm rounded-2xl border">
        {data.stats.map((stat, index) => {
          const IconComponent = iconMap[stat.icon as keyof typeof iconMap]
          return (
            <div
              key={index}
              className="text-center space-y-2"
              aria-label={`${stat.number} ${stat.label}`}
            >
              <div className="flex justify-center">
                <IconComponent className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-foreground">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          )
        })}

         
      </div>
      {/* Recent Posts - This can be dynamic from your API */}
      <RecentPostsSection />

    </div>
  )
}

// Separate component for recent posts that can fetch from your API
function RecentPostsSection() {
  // This can be replaced with actual data fetching
  const recentPosts = [
    'Understanding React Server Components',
    'Next.js 14 Best Practices', 
    'TypeScript Tips for Beginners'
  ]

  return (
    <div className="mt-8 p-6 bg-background/50 backdrop-blur-sm rounded-2xl border">
      <h3 className="font-semibold text-lg mb-4">Recently Published</h3>
      <div className="space-y-3">
        {recentPosts.map((post, index) => (
          <div key={index} className="flex items-center gap-3 text-sm">
            <div className="w-2 h-2 bg-primary rounded-full" aria-hidden="true" />
            <span className="text-muted-foreground hover:text-foreground transition-colors">
              {post}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}