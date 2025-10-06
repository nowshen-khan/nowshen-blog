// 'use client'
// import useSWR from 'swr'
// import Link from 'next/link'


// const fetcher = (url) => fetch(url).then(r => r.json())


// export default function Dashboard() {
// const { data, mutate } = useSWR('/api/blogs', fetcher)


// if (!data) return <div>Loading...</div>


// return (
// <div className="p-6">
// <div className="flex justify-between items-center mb-6">
// <h1 className="text-2xl">Dashboard</h1>
// <Link href="/dashboard/new" className="btn">New Post</Link>
// </div>
// <ul className="space-y-3">
// {data.map(b => (
// <li key={b._id} className="border p-3 rounded">
// <div className="flex justify-between">
// <div>
// <h2 className="font-medium">{b.title}</h2>
// <p className="text-sm text-gray-500">{b.category} • {b.tags?.join(', ')}</p>
// </div>
// <div className="flex gap-2">
// <Link href={`/dashboard/edit/${b._id}`} className="btn-sm">Edit</Link>
// </div>
// </div>
// </li>
// ))}
// </ul>
// </div>
// )
// }

import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page