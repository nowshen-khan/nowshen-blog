'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CategoryLinkProps {
  category: string | null;
  currentCategory?: string;
  children: React.ReactNode;
  className?: string;
}

export default function CategoryLink({ 
  category, 
  currentCategory, 
  children, 
  className 
}: CategoryLinkProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams(searchParams.toString());
    
    if (category) {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    params.delete('page'); // Reset to first page
    params.delete('tag'); // Remove tag when selecting category

    router.push(`/blog?${params.toString()}`, { scroll: false });
  };

  const isActive = category ? currentCategory === category : !currentCategory;

  return (
    <Button
      variant={isActive ? "default" : "ghost"}
      size="sm"
      className={cn("transition-all duration-300", className)}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}