"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { BlogDocument, ContentBlock } from "@/models/Blog";
import Image from "next/image";

interface BlogEditorProps {
  blog?: BlogDocument;
  onSave: (blogData: Partial<BlogDocument>) => void;
}

export default function BlogEditor({ blog, onSave }: BlogEditorProps) {
  const [title, setTitle] = useState(blog?.title || "");
  const [excerpt, setExcerpt] = useState(blog?.excerpt || "");
  const [coverImage, setCoverImage] = useState(blog?.coverImage || "");
  const [coverImageAlt, setCoverImageAlt] = useState(blog?.coverImageAlt || "");
  const [category, setCategory] = useState(blog?.category || "personal");
  const [tags, setTags] = useState(blog?.tags.join(", ") || "");
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>(blog?.contentBlocks || []);
  const [isPublished, setIsPublished] = useState(blog?.isPublished || false);
  const [isFeatured, setIsFeatured] = useState(blog?.isFeatured || false);
  const [metaTitle, setMetaTitle] = useState(blog?.metaTitle || "");
  const [metaDescription, setMetaDescription] = useState(blog?.metaDescription || "");

  const handleSave = () => {
    onSave({
      title,
      excerpt,
      coverImage,
      coverImageAlt,
      category,
      tags: tags.split(",").map(t => t.trim().toLowerCase()),
      contentBlocks,
      isPublished,
      isFeatured,
      metaTitle,
      metaDescription,
    });
  };

  const addContentBlock = (type: ContentBlock["type"]) => {
    setContentBlocks([
      ...contentBlocks,
      { type, content: "", order: contentBlocks.length + 1 }
    ]);
  };

  const updateContentBlock = (index: number, newBlock: Partial<ContentBlock>) => {
    const updatedBlocks = [...contentBlocks];
    updatedBlocks[index] = { ...updatedBlocks[index], ...newBlock };
    setContentBlocks(updatedBlocks);
  };

  const removeContentBlock = (index: number) => {
    setContentBlocks(contentBlocks.filter((_, i) => i !== index));
  };

  const renderPreviewBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case "heading":
        return <h2 key={index} className="text-xl font-bold my-2">{block.content}</h2>;
      case "paragraph":
        return <p key={index} className="my-2">{block.content}</p>;
      case "quote":
        return <blockquote key={index} className="border-l-4 pl-4 italic my-2">{block.content}</blockquote>;
      case "code":
        return <pre key={index} className="bg-gray-100 p-2 rounded my-2"><code>{block.content}</code></pre>;
      case "list":
        return <ul key={index} className="list-disc ml-6 my-2">{block.items?.map((item, i) => <li key={i}>{item}</li>)}</ul>;
      case "image":
        return <Image key={index} src={block.url} alt={block.alt || ""} className="my-2 max-w-full rounded" />;
      case "video":
        return <video key={index} src={block.url} controls className="my-2 max-w-full rounded" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* Left: Editor */}
      <div className="space-y-6 p-6  rounded-lg shadow-md overflow-auto max-h-[80vh]">
        <div>
          <Label>Title</Label>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div>
          <Label>Excerpt</Label>
          <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Cover Image URL</Label>
            <Input value={coverImage} onChange={(e) => setCoverImage(e.target.value)} />
          </div>
          <div>
            <Label>Cover Image Alt</Label>
            <Input value={coverImageAlt} onChange={(e) => setCoverImageAlt(e.target.value)} />
          </div>
        </div>

        <div>
          <Label>Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {["technology", "programming", "life", "travel", "books", "personal", "other"].map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Tags (comma separated)</Label>
          <Input value={tags} onChange={(e) => setTags(e.target.value)} />
        </div>

        <div className="space-y-4">
          <Label>Content Blocks</Label>
          {contentBlocks.map((block, index) => (
            <div key={index} className="p-4 border rounded space-y-2">
              <div className="flex justify-between items-center">
                <span>{block.type.toUpperCase()}</span>
                <Button variant="destructive" size="sm" onClick={() => removeContentBlock(index)}>Remove</Button>
              </div>
              {["paragraph", "heading", "quote", "code"].includes(block.type) && (
                <Textarea
                  value={block.content || ""}
                  onChange={(e) => updateContentBlock(index, { content: e.target.value })}
                />
              )}
              {block.type === "list" && (
                <Textarea
                  value={(block.items || []).join("\n")}
                  onChange={(e) => updateContentBlock(index, { items: e.target.value.split("\n") })}
                  placeholder="Enter one item per line"
                />
              )}
              {["image", "video"].includes(block.type) && (
                <Input
                  value={block.url || ""}
                  onChange={(e) => updateContentBlock(index, { url: e.target.value })}
                  placeholder="Media URL"
                />
              )}
            </div>
          ))}

          <div className="flex gap-2 flex-wrap">
            {["paragraph", "heading", "list", "image", "code", "quote", "video"].map(type => (
              <Button key={type} onClick={() => addContentBlock(type)}>{type}</Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Switch checked={isPublished} onCheckedChange={setIsPublished} />
            <Label>Published</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch checked={isFeatured} onCheckedChange={setIsFeatured} />
            <Label>Featured</Label>
          </div>
        </div>

        <div>
          <Label>Meta Title</Label>
          <Input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
        </div>
        <div>
          <Label>Meta Description</Label>
          <Textarea value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} />
        </div>

        <Button onClick={handleSave} className="mt-4">Save Blog</Button>
      </div>

      {/* Right: Live Preview */}
      <div className="p-6 rounded-lg shadow-inner overflow-auto max-h-[80vh]">
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-gray-600 mb-4">{excerpt}</p>
        {coverImage && <Image src={coverImage} alt={coverImageAlt} className="mb-4 max-w-full rounded" />}
        <div className="space-y-3">
          {contentBlocks
            .sort((a, b) => a.order - b.order)
            .map((block, index) => renderPreviewBlock(block, index))}
        </div>
        <div className="mt-4 text-sm text-gray-500">
          Category: {category} | Tags: {tags}
        </div>
      </div>
    </div>
  );
}
