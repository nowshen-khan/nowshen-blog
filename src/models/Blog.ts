// models/Blog.ts
import mongoose, { Schema, Document, Model, Types } from "mongoose";

export interface ContentBlock {
	type: "paragraph" | "heading" | "image" | "code" | "list" | "quote" | "video";
	content?: string;
	level?: number;
	language?: string;
	items?: string[];
	url?: string;
	caption?: string;
	alt?: string;
	order: number;
}

export interface BlogType {
	_id: string;
	title: string;
	slug: string;
	excerpt: string;
	author:
		| {
				_id?: string;
				name: string;
				image?: string;
		  }
		| string; // populated or just ObjectId
	category: string;
	tags: string[];
	coverImage: string;
	coverImageAlt?: string;
	contentBlocks: ContentBlock[];
	metaTitle?: string;
	metaDescription?: string;
	isPublished: boolean;
	isFeatured: boolean;
	views: number;
	likes: number;
	readingTime: number;
	wordCount: number;
	publishedAt?: Date;
	createdAt: Date;
	updatedAt: Date;
}

export interface BlogDocument extends Document {
	title: string;
	slug: string;
	excerpt: string;
	author: Types.ObjectId;
	category: string;
	tags: string[];
	coverImage: string;
	coverImageAlt?: string;
	contentBlocks: ContentBlock[];
	metaTitle?: string;
	metaDescription?: string;
	isPublished: boolean;
	isFeatured: boolean;
	views: number;
	likes: number;
	readingTime: number;
	wordCount: number;
	publishedAt?: Date;
	createdAt: Date;
	updatedAt: Date;
}

const ContentBlockSchema = new Schema<ContentBlock>(
	{
		type: {
			type: String,
			required: true,
			enum: ["paragraph", "heading", "image", "code", "list", "quote", "video"],
		},
		content: { type: String },
		level: { type: Number, min: 1, max: 6 },
		language: { type: String },
		items: [{ type: String }],
		url: { type: String },
		caption: { type: String },
		alt: { type: String },
		order: { type: Number, required: true, default: 0 },
	},
	{ _id: false }
);

const BlogSchema = new Schema<BlogDocument>(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			maxlength: 100,
		},
		slug: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
		},
		excerpt: {
			type: String,
			required: true,
			trim: true,
			maxlength: 200,
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		category: {
			type: String,
			required: true,
			enum: [
				"technology",
				"programming",
				"life",
				"travel",
				"books",
				"personal",
				"other",
			],
			default: "personal",
		},
		tags: [
			{
				type: String,
				trim: true,
				lowercase: true,
			},
		],
		coverImage: {
			type: String,
			required: true,
		},
		coverImageAlt: {
			type: String,
			trim: true,
		},
		contentBlocks: [ContentBlockSchema],
		metaTitle: {
			type: String,
			trim: true,
		},
		metaDescription: {
			type: String,
			trim: true,
		},
		isPublished: {
			type: Boolean,
			default: false,
		},
		isFeatured: {
			type: Boolean,
			default: false,
		},
		views: {
			type: Number,
			default: 0,
		},
		likes: {
			type: Number,
			default: 0,
		},
		readingTime: {
			type: Number,
			required: true,
			min: 1,
		},
		wordCount: {
			type: Number,
			required: true,
			min: 0,
		},
		publishedAt: {
			type: Date,
		},
	},
	{
		timestamps: true,
	}
);

// Auto-generate slug and calculate reading time
BlogSchema.pre("save", function (next) {
	if (this.isModified("title") && !this.slug) {
		this.slug = this.title
			.toLowerCase()
			.replace(/[^a-z0-9 -]/g, "")
			.replace(/\s+/g, "-")
			.replace(/-+/g, "-")
			.trim();
	}

	if (this.isModified("contentBlocks")) {
		this.calculateReadingStats();
	}

	if (this.isModified("isPublished") && this.isPublished && !this.publishedAt) {
		this.publishedAt = new Date();
	}
	next();
});

BlogSchema.methods.calculateReadingStats = function () {
	let wordCount = 0;
	let imageCount = 0;
	let codeBlockCount = 0;

	this.contentBlocks.forEach((block) => {
		switch (block.type) {
			case "paragraph":
			case "heading":
				wordCount += (block.content || "").split(/\s+/).length;
				break;
			case "list":
				wordCount += (block.items || []).join(" ").split(/\s+/).length;
				break;
			case "image":
				imageCount++;
				break;
			case "code":
				codeBlockCount++;
				break;
		}
	});

	this.wordCount = wordCount;
	const baseReadingTime = Math.ceil(wordCount / 200);
	const imageTime = Math.ceil(imageCount * 0.2);
	const codeTime = Math.ceil(codeBlockCount * 0.5);
	this.readingTime = Math.max(1, baseReadingTime + imageTime + codeTime);
};

export const Blog: Model<BlogDocument> =
	mongoose.models.Blog || mongoose.model<BlogDocument>("Blog", BlogSchema);
