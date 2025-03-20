import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Bold, Italic, Link, Image, Hash, AtSign, Send } from "lucide-react";

interface PostEditorProps {
  onSubmit?: (
    content: string,
    attachments: string[],
    tags: string[],
    mentions: string[],
  ) => void;
  placeholder?: string;
  initialContent?: string;
  maxLength?: number;
}

const PostEditor = ({
  onSubmit = () => {},
  placeholder = "What's on your mind?",
  initialContent = "",
  maxLength = 1000,
}: PostEditorProps) => {
  const [content, setContent] = useState(initialContent);
  const [attachments, setAttachments] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [mentions, setMentions] = useState<string[]>([]);
  const [showTagInput, setShowTagInput] = useState(false);
  const [showMentionInput, setShowMentionInput] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [mentionInput, setMentionInput] = useState("");

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= maxLength) {
      setContent(e.target.value);
    }
  };

  const handleSubmit = () => {
    onSubmit(content, attachments, tags, mentions);
    // Reset form after submission
    setContent("");
    setAttachments([]);
    setTags([]);
    setMentions([]);
  };

  const handleImageUpload = () => {
    // Mock image upload - in a real app, this would open a file picker
    const mockImageUrl =
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=75";
    setAttachments([...attachments, mockImageUrl]);
  };

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
    setShowTagInput(false);
  };

  const addMention = () => {
    if (mentionInput && !mentions.includes(mentionInput)) {
      setMentions([...mentions, mentionInput]);
      setMentionInput("");
    }
    setShowMentionInput(false);
  };

  const formatText = (type: "bold" | "italic" | "link") => {
    // This is a simplified implementation
    // In a real app, you would modify the text at the current cursor position
    const formatMap = {
      bold: `**${content}**`,
      italic: `*${content}*`,
      link: `[${content}](url)`,
    };

    setContent(formatMap[type]);
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4">
      <Textarea
        value={content}
        onChange={handleContentChange}
        placeholder={placeholder}
        className="min-h-[150px] mb-2 p-3 focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex justify-between items-center mb-2">
        <div className="text-xs text-gray-500">
          {content.length}/{maxLength} characters
        </div>
      </div>

      {/* Formatting Toolbar */}
      <div className="flex items-center space-x-2 mb-4 border-t border-b py-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => formatText("bold")}
              >
                <Bold className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Bold</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => formatText("italic")}
              >
                <Italic className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Italic</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => formatText("link")}
              >
                <Link className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Link</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" onClick={handleImageUpload}>
                <Image className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Image</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowTagInput(!showTagInput)}
              >
                <Hash className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add Tag</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowMentionInput(!showMentionInput)}
              >
                <AtSign className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Mention User</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Tag Input */}
      {showTagInput && (
        <div className="mb-3 flex items-center">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            placeholder="Enter tag"
            className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button onClick={addTag} className="rounded-l-none">
            Add
          </Button>
        </div>
      )}

      {/* Mention Input */}
      {showMentionInput && (
        <div className="mb-3 flex items-center">
          <input
            type="text"
            value={mentionInput}
            onChange={(e) => setMentionInput(e.target.value)}
            placeholder="Enter username"
            className="flex-1 p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button onClick={addMention} className="rounded-l-none">
            Add
          </Button>
        </div>
      )}

      {/* Preview Area */}
      {(attachments.length > 0 || tags.length > 0 || mentions.length > 0) && (
        <div className="mb-4 p-3 bg-gray-50 rounded-md">
          {/* Attachments Preview */}
          {attachments.length > 0 && (
            <div className="mb-2">
              <h4 className="text-sm font-medium mb-1">Attachments:</h4>
              <div className="flex flex-wrap gap-2">
                {attachments.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt="Attachment"
                      className="h-20 w-20 object-cover rounded"
                    />
                    <button
                      onClick={() =>
                        setAttachments(
                          attachments.filter((_, i) => i !== index),
                        )
                      }
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags Preview */}
          {tags.length > 0 && (
            <div className="mb-2">
              <h4 className="text-sm font-medium mb-1">Tags:</h4>
              <div className="flex flex-wrap gap-1">
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
                  >
                    #{tag}
                    <button
                      onClick={() =>
                        setTags(tags.filter((_, i) => i !== index))
                      }
                      className="ml-1 text-blue-800 hover:text-blue-900"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mentions Preview */}
          {mentions.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-1">Mentions:</h4>
              <div className="flex flex-wrap gap-1">
                {mentions.map((mention, index) => (
                  <div
                    key={index}
                    className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-sm flex items-center"
                  >
                    @{mention}
                    <button
                      onClick={() =>
                        setMentions(mentions.filter((_, i) => i !== index))
                      }
                      className="ml-1 text-purple-800 hover:text-purple-900"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={!content.trim()}
          className="flex items-center gap-2"
        >
          <Send className="h-4 w-4" />
          Post
        </Button>
      </div>
    </div>
  );
};

export default PostEditor;
