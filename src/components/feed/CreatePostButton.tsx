import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CreatePostButtonProps {
  onClick?: () => void;
  position?: "bottom-right" | "center";
  size?: "default" | "large";
}

const CreatePostButton = ({
  onClick = () => {},
  position = "bottom-right",
  size = "default",
}: CreatePostButtonProps) => {
  const positionClasses = {
    "bottom-right": "fixed bottom-6 right-6",
    center: "mx-auto",
  };

  const sizeClasses = {
    default: "h-12 w-12",
    large: "h-16 w-16",
  };

  return (
    <div className={`${positionClasses[position]} bg-white`}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={onClick}
              className={`${sizeClasses[size]} rounded-full shadow-lg hover:shadow-xl transition-all duration-300`}
              size="icon"
              aria-label="Create new post"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Create new post</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default CreatePostButton;
