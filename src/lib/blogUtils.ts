import { ContentBlock } from "@/components/BlogRenderer"

export function calculateReadingTime(contentBlocks: ContentBlock[]): number {
  const wordsPerMinute = 200
  let words = 0

  contentBlocks.forEach(block => {
    switch (block.type) {
      case "paragraph":
      case "heading":
      case "quote":
        words += block.content.split(" ").length
        break
      case "list":
        block.content.forEach(item => {
          words += item.split(" ").length
        })
        break
      case "code":
      case "image":
        // ignore code/image blocks for reading time
        break
      default:
        break
    }
  })

  return Math.max(1, Math.ceil(words / wordsPerMinute))
}
