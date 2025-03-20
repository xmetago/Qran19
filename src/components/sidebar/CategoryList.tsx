import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  Users,
  Globe,
  Shield,
  Heart,
  AlertTriangle,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  count: number;
  icon: React.ReactNode;
  color?: string;
}

interface CategoryListProps {
  categories?: Category[];
  title?: string;
  onCategoryClick?: (category: Category) => void;
}

const CategoryList = ({
  categories = [
    {
      id: "1",
      name: "Human Rights",
      count: 1243,
      icon: <Shield className="h-4 w-4" />,
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: "2",
      name: "Environment",
      count: 856,
      icon: <Globe className="h-4 w-4" />,
      color: "bg-green-100 text-green-800",
    },
    {
      id: "3",
      name: "Social Justice",
      count: 721,
      icon: <Users className="h-4 w-4" />,
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: "4",
      name: "Healthcare",
      count: 532,
      icon: <Heart className="h-4 w-4" />,
      color: "bg-red-100 text-red-800",
    },
    {
      id: "5",
      name: "Crisis Response",
      count: 328,
      icon: <AlertTriangle className="h-4 w-4" />,
      color: "bg-amber-100 text-amber-800",
    },
  ],
  title = "Trending Categories",
  onCategoryClick = () => {},
}: CategoryListProps) => {
  return (
    <Card className="w-full bg-white">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              className="w-full justify-between h-auto py-2 px-3 hover:bg-muted/50"
              onClick={() => onCategoryClick(category)}
            >
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "p-1.5 rounded-full",
                    category.color || "bg-gray-100",
                  )}
                >
                  {category.icon}
                </span>
                <span className="font-medium">{category.name}</span>
              </div>
              <Badge variant="secondary" className="ml-auto">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>
        <Button
          variant="ghost"
          className="w-full mt-4 text-primary hover:text-primary/80"
        >
          View All Categories
        </Button>
      </CardContent>
    </Card>
  );
};

export default CategoryList;
