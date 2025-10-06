import Image from "next/image"
import { FC } from "react"
import { Code } from "@/components/ui/code"

type ContentBlock = {
  type: string
  content: any
}

interface BlogRendererProps {
  contentBlocks: ContentBlock[]
}

export const BlogRenderer: FC<BlogRendererProps> = ({ contentBlocks }) => {
  return (
    <article className="prose dark:prose-invert max-w-full">
      {contentBlocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return <h2 key={i}>{block.content}</h2>
          case "paragraph":
            return <p key={i}>{block.content}</p>
          case "quote":
            return <blockquote key={i}>{block.content}</blockquote>
          case "code":
            return <Code key={i} className="my-2">{block.content.value}</Code>
          case "image":
            return (
              <div key={i} className="my-4 relative w-full h-64">
                <Image
                  src={block.content.url}
                  alt={block.content.alt || ""}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            )
          case "list":
            return (
              <ul key={i} className="list-disc pl-5">
                {block.content.map((item: string, idx: number) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )
          default:
            return null
        }
      })}
    </article>
  )
}

