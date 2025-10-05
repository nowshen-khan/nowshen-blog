import mongoose from "mongoose"

const ContentBlockSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["paragraph", "image", "quote", "code", "heading", "list"],
    required: true,
  },
  content: { type: mongoose.Schema.Types.Mixed },
})

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, trim: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      enum: ["tutorial", "news", "opinion", "guide", "update"],
      default: "tutorial",
    },
    tags: [String],
    coverImage: { type: String },
    contentBlocks: [ContentBlockSchema],
    isPublished: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    readingTime: { type: Number },
    publishedAt: { type: Date },
  },
  { timestamps: true }
)

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema)
