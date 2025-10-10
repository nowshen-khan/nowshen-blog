'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TagLinkProps {
  tag: string;
  currentTag?: string;
  count?: number;
}

export default function TagLink({ tag, currentTag, count }: TagLinkProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (tag === currentTag) {
      params.delete('tag');
    } else {
      params.set('tag', tag);
    }
    params.delete('page'); // Reset to first page
    params.delete('category'); // Remove category when selecting tag

    router.push(`/blog?${params.toString()}`, { scroll: false });
  };

  const isActive = tag === currentTag;

  return (
    <Badge
      variant={isActive ? "default" : "outline"}
      className={cn(
        "cursor-pointer transition-all duration-300 hover:scale-105",
        isActive && "animate-pulse"
      )}
      onClick={handleClick}
    >
      {tag} {count && `(${count})`}
    </Badge>
  );
}