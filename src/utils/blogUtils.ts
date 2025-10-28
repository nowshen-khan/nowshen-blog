// utils/blogUtils.ts

import { ContentBlock } from "../models/Blog";

export const generateSlug = (title: string): string => {
	return title
		.toLowerCase()
		.replace(/[^a-z0-9 -]/g, "")
		.replace(/\s+/g, "-")
		.replace(/-+/g, "-")
		.trim();
};

export const calculateReadingStats = (blocks: ContentBlock[]) => {
	let wordCount = 0;
	let imageCount = 0;
	let codeBlockCount = 0;

	blocks.forEach((block) => {
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

	const baseReadingTime = Math.ceil(wordCount / 200);
	const imageTime = Math.ceil(imageCount * 0.2);
	const codeTime = Math.ceil(codeBlockCount * 0.5);
	const readingTime = Math.max(1, baseReadingTime + imageTime + codeTime);

	return { wordCount, readingTime };
};

export const ensureSEOFields = ({
	title,
	slug,
	metaTitle,
	metaDescription,
	excerpt,
}: {
	title: string;
	slug?: string;
	metaTitle?: string;
	metaDescription?: string;
	excerpt?: string;
}) => {
	const seoSlug = slug || generateSlug(title);
	const seoTitle = metaTitle || `${title} | Nowshen Blog`;
	const seoDescription =
		metaDescription || excerpt?.substring(0, 150).trim() || "";

	return {
		slug: seoSlug,
		metaTitle: seoTitle,
		metaDescription: seoDescription,
	};
};
