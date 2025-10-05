export function calculateReadingTime(contentBlocks: any[]): number {
  const wordsPerMinute = 200
  let words = 0

  contentBlocks.forEach(block => {
    if (block.type === "paragraph" || block.type === "heading" || block.type === "quote") {
      words += block.content.split(" ").length
    } else if (block.type === "list") {
      block.content.forEach((item: string) => {
        words += item.split(" ").length
      })
    }
  })

  return Math.max(1, Math.ceil(words / wordsPerMinute))
}
