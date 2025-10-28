// models/Blog.ts
import mongoose, { Schema, Document, Model, Types } from "mongoose";
import {
	generateSlug,
	calculateReadingStats,
	ensureSEOFields,
} from "@/utils/blogUtils";

// ---- Interfaces ----
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

export interface SEOFields {
	metaTitle?: string;
	metaDescription?: string;
	slug?: string;
}

export interface BlogType extends SEOFields {
	title: string;
	excerpt: string;
	author:
		| {
				_id?: string;
				name: string;
				image?: string;
		  }
		| string;
	category: string;
	tags: string[];
	coverImage: string;
	coverImageAlt?: string;
	contentBlocks: ContentBlock[];
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

export interface BlogDocument extends Document, BlogType {
	calculateSEO(): void;
	calculateReadingStats(): void;
}

// ---- ContentBlock Schema ----
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

// ---- Blog Schema ----
const BlogSchema = new Schema<BlogDocument>(
	{
		title: { type: String, required: true, trim: true, maxlength: 100 },
		slug: { type: String, unique: true, trim: true, lowercase: true },
		excerpt: { type: String, required: true, trim: true, maxlength: 200 },
		author: { type: Schema.Types.ObjectId, ref: "User", required: true },
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
		tags: [{ type: String, trim: true, lowercase: true }],
		coverImage: { type: String, required: true },
		coverImageAlt: { type: String, trim: true },
		contentBlocks: [ContentBlockSchema],
		metaTitle: { type: String, trim: true },
		metaDescription: { type: String, trim: true },
		isPublished: { type: Boolean, default: false },
		isFeatured: { type: Boolean, default: false },
		views: { type: Number, default: 0 },
		likes: { type: Number, default: 0 },
		readingTime: { type: Number, required: true, min: 1, default: 1 },
		wordCount: { type: Number, required: true, min: 0, default: 0 },
		publishedAt: { type: Date },
	},
	{ timestamps: true }
);

// ---- Instance Methods ----
BlogSchema.methods.calculateReadingStats = function () {
	const { wordCount, readingTime } = calculateReadingStats(this.contentBlocks);
	this.wordCount = wordCount;
	this.readingTime = readingTime;
};

BlogSchema.methods.calculateSEO = function () {
	const { slug, metaTitle, metaDescription } = ensureSEOFields({
		title: this.title,
		slug: this.slug,
		metaTitle: this.metaTitle,
		metaDescription: this.metaDescription,
		excerpt: this.excerpt,
	});
	this.slug = slug;
	this.metaTitle = metaTitle;
	this.metaDescription = metaDescription;
};

// ---- Pre-save Hook ----
BlogSchema.pre("save", function (next) {
	if (this.isModified("title") && !this.slug) {
		this.slug = generateSlug(this.title);
	}

	if (this.isModified("contentBlocks")) {
		this.calculateReadingStats();
	}

	this.calculateSEO();

	if (this.isModified("isPublished") && this.isPublished && !this.publishedAt) {
		this.publishedAt = new Date();
	}
	next();
});

export const Blog: Model<BlogDocument> =
	mongoose.models.Blog || mongoose.model<BlogDocument>("Blog", BlogSchema);
