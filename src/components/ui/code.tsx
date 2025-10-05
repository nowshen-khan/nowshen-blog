// src/components/ui/code.tsx
"use client"

import { FC, ReactNode } from "react"
import clsx from "clsx"

interface CodeProps {
  children: ReactNode
  className?: string
}

/**
 * Simple Code component similar to shadcn/ui style.
 * - Uses Tailwind for styling
 * - Supports optional className for extra styling
 */
export const Code: FC<CodeProps> = ({ children, className }) => {
  return (
    <pre
      className={clsx(
        "bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto text-sm font-mono",
        className
      )}
    >
      <code>{children}</code>
    </pre>
  )
}
