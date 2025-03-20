import React from "react";
import { Card } from "@/components/ui/card";
import ProfileSummary from "./ProfileSummary";
import CategoryList from "./CategoryList";
import { Button } from "@/components/ui/button";
import { Info, Users } from "lucide-react";

interface SidebarContainerProps {
  user?: {
    name: string;
    username: string;
    avatar: string;
    followers: number;
    following: number;
    activeCauses: number;
  };
  categories?: Array<{
    id: string;
    name: string;
    count: number;
    icon: React.ReactNode;
    color?: string;
  }>;
  onCategoryClick?: (category: any) => void;
}

const SidebarContainer = ({
  user,
  categories,
  onCategoryClick,
}: SidebarContainerProps) => {
  return (
    <div className="w-full h-full bg-gray-50 p-4 space-y-4 border-l border-gray-200">
      <ProfileSummary user={user} />

      <CategoryList categories={categories} onCategoryClick={onCategoryClick} />

      <Card className="w-full bg-white p-4">
        <h3 className="text-sm font-semibold flex items-center gap-2 mb-3">
          <Info className="h-4 w-4 text-primary" />
          Suggested Connections
        </h3>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=user${i}`}
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium">Activist User {i}</p>
                  <p className="text-xs text-gray-500 flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    {Math.floor(Math.random() * 10) + 1} mutual causes
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="text-xs h-7">
                Connect
              </Button>
            </div>
          ))}
        </div>
        <Button variant="ghost" className="w-full mt-3 text-xs text-primary">
          View More
        </Button>
      </Card>

      <div className="text-xs text-gray-500 mt-4">
        <div className="flex flex-wrap gap-x-2 gap-y-1 mb-2">
          <a href="#" className="hover:underline">
            About
          </a>
          <a href="#" className="hover:underline">
            Privacy
          </a>
          <a href="#" className="hover:underline">
            Terms
          </a>
          <a href="#" className="hover:underline">
            Guidelines
          </a>
          <a href="#" className="hover:underline">
            Help Center
          </a>
        </div>
        <p>© 2023 WhoDoom Social Activism Platform</p>
      </div>
    </div>
  );
};

export default SidebarContainer;
