// components/blog/LikeButton.tsx
'use client'

import { useState } from 'react'

export default function LikeButton({ blogId }: { blogId: string }) {
  const [likes, setLikes] = useState(0)
  const [liked, setLiked] = useState(false)

  const handleLike = async () => {
    if (liked) return
    
    setLiked(true)
    setLikes(prev => prev + 1)
    
    await fetch(`/api/blog/${blogId}/like`, {
      method: 'POST'
    })
  }

  return (
    <button onClick={handleLike} disabled={liked}>
      ❤️ {likes} Likes
    </button>
  )
}