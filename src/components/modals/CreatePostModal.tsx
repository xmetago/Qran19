import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import CategorySelector from "./CategorySelector";
import PostEditor from "./PostEditor";
import { X } from "lucide-react";

interface CreatePostModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onSubmit?: (data: {
    category: string;
    content: string;
    attachments: string[];
    tags: string[];
    mentions: string[];
  }) => void;
}

const CreatePostModal = ({
  open = true,
  onOpenChange = () => {},
  onSubmit = () => {},
}: CreatePostModalProps) => {
  const [step, setStep] = useState<"category" | "editor">("category");
  const [category, setCategory] = useState<string>("dava");

  const handleCategorySelect = (selectedCategory: string) => {
    setCategory(selectedCategory);
    setStep("editor");
  };

  const handlePostSubmit = (
    content: string,
    attachments: string[],
    tags: string[],
    mentions: string[],
  ) => {
    onSubmit({
      category,
      content,
      attachments,
      tags,
      mentions,
    });

    // Reset and close modal
    setStep("category");
    onOpenChange(false);
  };

  const handleBack = () => {
    setStep("category");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {step === "category"
              ? "Create New Post"
              : category === "dava"
                ? "Create Case"
                : "Create Shout"}
          </DialogTitle>
        </DialogHeader>

        {step === "category" ? (
          <CategorySelector
            onCategorySelect={handleCategorySelect}
            selectedCategory={category}
          />
        ) : (
          <div className="space-y-4">
            <PostEditor
              onSubmit={handlePostSubmit}
              placeholder={
                category === "dava"
                  ? "Describe the case in detail. What happened? What needs to change?"
                  : "What do you want to shout about?"
              }
              maxLength={category === "dava" ? 2000 : 500}
            />
          </div>
        )}

        <DialogFooter className="flex justify-between items-center mt-4">
          {step === "editor" && (
            <Button variant="outline" onClick={handleBack} className="mr-auto">
              Back to Categories
            </Button>
          )}
          <DialogClose asChild>
            <Button variant="ghost" size="icon">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
