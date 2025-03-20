import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Slider } from "../ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Palette, Smile, User, Camera, RefreshCw } from "lucide-react";

interface AvatarCustomizerProps {
  open?: boolean;
  onClose?: () => void;
  onSave?: (avatarConfig: AvatarConfig) => void;
  initialConfig?: AvatarConfig;
}

interface AvatarConfig {
  style: string;
  skinTone: string;
  hairColor: string;
  hairStyle: string;
  facialFeature: string;
  accessory: string;
  seed?: string;
}

const AvatarCustomizer: React.FC<AvatarCustomizerProps> = ({
  open = true,
  onClose = () => {},
  onSave = () => {},
  initialConfig = {
    style: "avataaars",
    skinTone: "light",
    hairColor: "brown",
    hairStyle: "long",
    facialFeature: "smile",
    accessory: "none",
    seed: "user1",
  },
}) => {
  const [activeTab, setActiveTab] = useState("style");
  const [avatarConfig, setAvatarConfig] = useState<AvatarConfig>(initialConfig);

  const generateAvatarUrl = () => {
    return `https://api.dicebear.com/7.x/${avatarConfig.style}/svg?seed=${avatarConfig.seed || "user1"}&skinColor=${avatarConfig.skinTone}&hairColor=${avatarConfig.hairColor}`;
  };

  const handleRandomize = () => {
    const seed = Math.random().toString(36).substring(2, 10);
    setAvatarConfig({
      ...avatarConfig,
      seed,
    });
  };

  const handleSave = () => {
    onSave(avatarConfig);
    onClose();
  };

  const updateConfig = (key: keyof AvatarConfig, value: string) => {
    setAvatarConfig({
      ...avatarConfig,
      [key]: value,
    });
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Customize Your Avatar
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center space-y-6 py-4">
          <div className="relative">
            <Avatar className="h-32 w-32 border-4 border-primary">
              <AvatarImage src={generateAvatarUrl()} alt="User avatar" />
              <AvatarFallback className="bg-primary/10">
                <User className="h-12 w-12 text-primary" />
              </AvatarFallback>
            </Avatar>
            <Button
              size="icon"
              variant="outline"
              className="absolute -bottom-2 -right-2 rounded-full bg-white"
              onClick={handleRandomize}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="style">
                <Palette className="h-4 w-4 mr-2" />
                Style
              </TabsTrigger>
              <TabsTrigger value="features">
                <User className="h-4 w-4 mr-2" />
                Features
              </TabsTrigger>
              <TabsTrigger value="expressions">
                <Smile className="h-4 w-4 mr-2" />
                Expressions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="style" className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Avatar Style</label>
                <Select
                  value={avatarConfig.style}
                  onValueChange={(value) => updateConfig("style", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="avataaars">Avataaars</SelectItem>
                    <SelectItem value="bottts">Bottts</SelectItem>
                    <SelectItem value="micah">Micah</SelectItem>
                    <SelectItem value="personas">Personas</SelectItem>
                    <SelectItem value="pixel-art">Pixel Art</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Skin Tone</label>
                <Select
                  value={avatarConfig.skinTone}
                  onValueChange={(value) => updateConfig("skinTone", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select skin tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="features" className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Hair Style</label>
                <Select
                  value={avatarConfig.hairStyle}
                  onValueChange={(value) => updateConfig("hairStyle", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select hair style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Short</SelectItem>
                    <SelectItem value="long">Long</SelectItem>
                    <SelectItem value="bald">Bald</SelectItem>
                    <SelectItem value="curly">Curly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Hair Color</label>
                <Select
                  value={avatarConfig.hairColor}
                  onValueChange={(value) => updateConfig("hairColor", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select hair color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="black">Black</SelectItem>
                    <SelectItem value="brown">Brown</SelectItem>
                    <SelectItem value="blonde">Blonde</SelectItem>
                    <SelectItem value="red">Red</SelectItem>
                    <SelectItem value="gray">Gray</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Accessory</label>
                <Select
                  value={avatarConfig.accessory}
                  onValueChange={(value) => updateConfig("accessory", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select accessory" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="glasses">Glasses</SelectItem>
                    <SelectItem value="sunglasses">Sunglasses</SelectItem>
                    <SelectItem value="hat">Hat</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>

            <TabsContent value="expressions" className="space-y-4 mt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Facial Expression</label>
                <Select
                  value={avatarConfig.facialFeature}
                  onValueChange={(value) =>
                    updateConfig("facialFeature", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select expression" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smile">Smile</SelectItem>
                    <SelectItem value="serious">Serious</SelectItem>
                    <SelectItem value="surprised">Surprised</SelectItem>
                    <SelectItem value="happy">Happy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Avatar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AvatarCustomizer;
