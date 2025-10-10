"use server"

import { revalidatePath } from "next/cache"
import connectDB from "@/lib/mongodb"
import { Blog } from "@/models/Blog"

export async function updateBlog(id: string, data: any) {
  await connectDB()

  try {
    const updated = await Blog.findByIdAndUpdate(id, data, { new: true })
    revalidatePath("/admin/blogs") // refresh blog list page
    return { success: true, blog: JSON.parse(JSON.stringify(updated)) }
  } catch (err) {
    console.error("Failed to update blog:", err)
    return { success: false, message: "Failed to update blog" }
  }
}
