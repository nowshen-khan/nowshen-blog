"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Props = {
  onFilterChange: (filters: {
    category?: string
    tag?: string
    startDate?: string
    endDate?: string
    sort?: "latest" | "oldest"
  }) => void
}

export default function FilterSidebar({ onFilterChange }: Props) {
  const [categories, setCategories] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [sort, setSort] = useState<"latest" | "oldest">("latest")

  useEffect(() => {
    fetch("/api/blogs/categories").then(r => r.json()).then(setCategories)
    fetch("/api/blogs/tags").then(r => r.json()).then(setTags)
  }, [])
    


  const handleCategory = (cat: string) => {
    const newCat = selectedCategory === cat ? null : cat
    setSelectedCategory(newCat)
    triggerFilter({ category: newCat })
  }

  const handleTag = (tag: string) => {
    const newTag = selectedTag === tag ? null : tag
    setSelectedTag(newTag)
    triggerFilter({ tag: newTag })
  }

  const handleSort = (value: "latest" | "oldest") => {
    setSort(value)
    triggerFilter({ sort: value })
  }

  const triggerFilter = (partial: Partial<{category?: string, tag?: string, startDate?: string, endDate?: string, sort?: "latest"|"oldest"}>) => {
    onFilterChange({
      category: partial.category ?? selectedCategory ?? undefined,
      tag: partial.tag ?? selectedTag ?? undefined,
      sort: partial.sort ?? sort
    })
  }

  return (
    <aside className="w-full md:w-64 p-4 bg-card rounded-md space-y-6">
      {/* Category */}
      <div>
        <h4 className="font-semibold mb-2">Categories</h4>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <Button
              key={cat}
              size="sm"
              variant={selectedCategory === cat ? "default" : "outline"}
              onClick={() => handleCategory(cat)}
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <h4 className="font-semibold mb-2">Tags</h4>
        <div className="flex flex-wrap gap-2">
          {tags.map(tag => (
            <Button
              key={tag}
              size="sm"
              variant={selectedTag === tag ? "default" : "outline"}
              onClick={() => handleTag(tag)}
            >
              {tag}
            </Button>
          ))}
        </div>
      </div>

    

      {/* Sort */}
      <div>
        <h4 className="font-semibold mb-2">Sort By</h4>
        <Select onValueChange={(v) => handleSort(v as "latest" | "oldest")}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={sort === "latest" ? "Latest" : "Oldest"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
          </div>
    </aside>
  )
}
