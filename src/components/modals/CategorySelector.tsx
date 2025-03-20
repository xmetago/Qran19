import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MegaphoneIcon, ScaleIcon } from "lucide-react";

interface CategorySelectorProps {
  onCategorySelect?: (category: string) => void;
  selectedCategory?: string;
}

const CategorySelector = ({
  onCategorySelect = () => {},
  selectedCategory = "dava",
}: CategorySelectorProps) => {
  const handleCategoryChange = (value: string) => {
    onCategorySelect(value);
  };

  return (
    <div className="w-full bg-background p-4 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Select Post Category</h2>
      <Tabs
        defaultValue={selectedCategory}
        onValueChange={handleCategoryChange}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 w-full mb-6">
          <TabsTrigger value="dava" className="flex items-center gap-2">
            <ScaleIcon className="h-4 w-4" />
            <span>Dava (Case)</span>
          </TabsTrigger>
          <TabsTrigger value="haykir" className="flex items-center gap-2">
            <MegaphoneIcon className="h-4 w-4" />
            <span>Haykır (Shout)</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dava" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dava (Case)</CardTitle>
              <CardDescription>
                Create a detailed case about a social issue that needs attention
                and action.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Cases are for structured activism content that includes detailed
                information, evidence, and calls for specific actions.
              </p>
              <ul className="list-disc pl-5 text-sm space-y-1 mb-4">
                <li>Document social injustices with evidence</li>
                <li>Propose specific actions and solutions</li>
                <li>Track progress and outcomes</li>
                <li>Enable community collaboration</li>
              </ul>
              <Button
                className="w-full"
                onClick={() => onCategorySelect("dava")}
              >
                Select Case Format
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="haykir" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Haykır (Shout)</CardTitle>
              <CardDescription>
                Express your opinion or grievance about a social issue in a more
                immediate format.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Shouts are for quick, expressive content that raises awareness
                about issues and sparks conversation in the community.
              </p>
              <ul className="list-disc pl-5 text-sm space-y-1 mb-4">
                <li>Share personal experiences and observations</li>
                <li>Raise awareness about emerging issues</li>
                <li>Express solidarity with causes</li>
                <li>Start conversations in the community</li>
              </ul>
              <Button
                className="w-full"
                onClick={() => onCategorySelect("haykir")}
              >
                Select Shout Format
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CategorySelector;
