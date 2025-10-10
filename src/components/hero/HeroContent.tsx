// components/hero/HeroContent.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, BookOpen } from 'lucide-react'

interface HeroContentProps {
  data: {
    welcomeText: string;
    title: string;
    subtitle: string;
    description: string;
    expertise: string[];
    buttons: {
      primary: { text: string; href: string };
      secondary: { text: string; href: string };
    };
  }
}

export default function HeroContent({ data }: HeroContentProps) {
  return (
    <div className="space-y-8">
      {/* Welcome Badge */}
      <div 
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
        aria-label="Welcome message"
      >
        <BookOpen className="w-4 h-4" />
        <span>{data.welcomeText}</span>
      </div>

      {/* Main Heading with SEO focus */}
      <div className="space-y-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="block text-foreground">{data.title}</span>
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
            {data.subtitle}
          </span>
        </h1>
        
        <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
           {data.description}
        </p>
      </div>

      {/* Expertise Tags */}
      <div className="flex flex-wrap gap-3" aria-label="Areas of expertise">
        {data.expertise.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full border"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Button asChild size="lg" className="group">
          <Link href={data.buttons.primary.href}>
            {data.buttons.primary.text}
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
        
        <Button asChild variant="outline" size="lg">
          <Link href={data.buttons.secondary.href} className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
             {data.buttons.secondary.text}
          </Link>
        </Button>
      </div>
    </div>
  )
}