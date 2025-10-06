// "use client"

// import { useState, useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// type Props = {
//   onFilterChange: (filters: {
//     category?: string
//     tag?: string
//     startDate?: string
//     endDate?: string
//     sort?: "latest" | "oldest"
//   }) => void
// }

// export default function FilterSidebar({ onFilterChange }: Props) {
//   const [categories, setCategories] = useState<string[]>([])
//   const [tags, setTags] = useState<string[]>([])
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
//   const [selectedTag, setSelectedTag] = useState<string | null>(null)
//   const [sort, setSort] = useState<"latest" | "oldest">("latest")

//   useEffect(() => {
//     fetch("/api/blogs/categories").then(r => r.json()).then(setCategories)
//     fetch("/api/blogs/tags").then(r => r.json()).then(setTags)
//   }, [])
    


//   const handleCategory = (cat: string) => {
//     const newCat = selectedCategory === cat ? null : cat
//     setSelectedCategory(newCat)
//     triggerFilter({ category: newCat })
//   }

//   const handleTag = (tag: string) => {
//     const newTag = selectedTag === tag ? null : tag
//     setSelectedTag(newTag)
//     triggerFilter({ tag: newTag })
//   }

//   const handleSort = (value: "latest" | "oldest") => {
//     setSort(value)
//     triggerFilter({ sort: value })
//   }

//   const triggerFilter = (partial: Partial<{category?: string, tag?: string, startDate?: string, endDate?: string, sort?: "latest"|"oldest"}>) => {
//     onFilterChange({
//       category: partial.category ?? selectedCategory ?? undefined,
//       tag: partial.tag ?? selectedTag ?? undefined,
//       sort: partial.sort ?? sort
//     })
//   }

//   return (
//     <aside className="w-full md:w-64 p-4 bg-card rounded-md space-y-6">
//       {/* Category */}
//       <div>
//         <h4 className="font-semibold mb-2">Categories</h4>
//         <div className="flex flex-wrap gap-2">
//           {categories.map(cat => (
//             <Button
//               key={cat}
//               size="sm"
//               variant={selectedCategory === cat ? "default" : "outline"}
//               onClick={() => handleCategory(cat)}
//             >
//               {cat}
//             </Button>
//           ))}
//         </div>
//       </div>

//       {/* Tags */}
//       <div>
//         <h4 className="font-semibold mb-2">Tags</h4>
//         <div className="flex flex-wrap gap-2">
//           {tags.map(tag => (
//             <Button
//               key={tag}
//               size="sm"
//               variant={selectedTag === tag ? "default" : "outline"}
//               onClick={() => handleTag(tag)}
//             >
//               {tag}
//             </Button>
//           ))}
//         </div>
//       </div>

    

//       {/* Sort */}
//       <div>
//         <h4 className="font-semibold mb-2">Sort By</h4>
//         <Select onValueChange={(v) => handleSort(v as "latest" | "oldest")}>
//           <SelectTrigger className="w-full">
//             <SelectValue placeholder={sort === "latest" ? "Latest" : "Oldest"} />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="latest">Latest</SelectItem>
//             <SelectItem value="oldest">Oldest</SelectItem>
//           </SelectContent>
//         </Select>
//           </div>
//     </aside>
//   )
// }

"use client"
import { useEffect, useState } from "react"

type FilterSidebarProps = {
  onFilterChange: (filters: {
    category: string
    tag: string
    sort: "latest" | "oldest"
  }) => void
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [categories, setCategories] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])

  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedTag, setSelectedTag] = useState("")
  const [sortOrder, setSortOrder] = useState<"latest" | "oldest">("latest")

  // ✅ ডাটাবেজ থেকে category & tag লোড করো
  useEffect(() => {
    async function fetchFilters() {
      const res = await fetch("/api/blogs/filters") // তোমার API endpoint
      const data = await res.json()
      setCategories(data.categories)
      setTags(data.tags)
    }
    fetchFilters()
  }, [])

  // ✅ যখনই কোনো ফিল্টার চেঞ্জ হয়, প্যারেন্টে পাঠাও
  useEffect(() => {
    onFilterChange({ category: selectedCategory, tag: selectedTag, sort: sortOrder })
  }, [selectedCategory, selectedTag, sortOrder])

  return (
    <aside className="p-4 border rounded-xl shadow-sm bg-white dark:bg-gray-800 space-y-4">
      <div>
        <h3 className="font-semibold mb-2">Category</h3>
        <select
          className="w-full border rounded-md p-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Tag</h3>
        <select
          className="w-full border rounded-md p-2"
          value={selectedTag}
          onChange={(e) => setSelectedTag(e.target.value)}
        >
          <option value="">All</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Sort By</h3>
        <div className="flex gap-2">
          <button
            className={`px-3 py-1 rounded-md border ${sortOrder === "latest" ? "bg-blue-600 text-white" : ""}`}
            onClick={() => setSortOrder("latest")}
          >
            Latest
          </button>
          <button
            className={`px-3 py-1 rounded-md border ${sortOrder === "oldest" ? "bg-blue-600 text-white" : ""}`}
            onClick={() => setSortOrder("oldest")}
          >
            Oldest
          </button>
        </div>
      </div>
    </aside>
  )
}
