// components/hero/HeroStats.tsx
import { FileText, Briefcase, Clock  } from 'lucide-react'
import HeroRecentPosts from './HeroRecentPosts';

const iconMap = {
  FileText,
  Briefcase,
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
          const IconComponent = iconMap[stat.icon as keyof typeof iconMap] ?? Users
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
      {/* Recent Posts - Dynamic using API */}
      <HeroRecentPosts />
    </div>
  )
}
