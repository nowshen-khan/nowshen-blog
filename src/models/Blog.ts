import mongoose, { Schema, models } from 'mongoose'

const ContentBlockSchema = new Schema({
type: { type: String, required: true, enum: [
'paragraph','heading','image','code','list','quote','chart','video','embed'
]},
content: Schema.Types.Mixed,
level: Number,
language: String,
items: [String],
url: String,
caption: String,
chartData: Schema.Types.Mixed,
})

const BlogSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true , trim: true},
    excerpt: { type: String, trim: true },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      default: "blog",
    },
    tags: [String],
    coverImage: { type: String },
    contentBlocks: [ContentBlockSchema],
    isPublished: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    readingTime: { type: Number },
    publishedAt: { type: Date },
     isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
)

const Blog = models.Blog || mongoose.model('Blog', BlogSchema)
export default Blog