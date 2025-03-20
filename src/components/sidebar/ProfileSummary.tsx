import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { User, Bell, Settings } from "lucide-react";

interface ProfileSummaryProps {
  user?: {
    name: string;
    username: string;
    avatar: string;
    followers: number;
    following: number;
    activeCauses: number;
  };
}

const ProfileSummary = ({
  user = {
    name: "Jane Doe",
    username: "@janedoe",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    followers: 245,
    following: 112,
    activeCauses: 8,
  },
}: ProfileSummaryProps) => {
  return (
    <Card className="w-full bg-white border-gray-200">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-sm">{user.name}</h3>
            <p className="text-xs text-gray-500">{user.username}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Settings className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2 text-center py-2">
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{user.followers}</span>
            <span className="text-xs text-gray-500">Followers</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{user.following}</span>
            <span className="text-xs text-gray-500">Following</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{user.activeCauses}</span>
            <span className="text-xs text-gray-500">Causes</span>
          </div>
        </div>

        <div className="flex space-x-2 mt-4">
          <Button variant="outline" size="sm" className="w-full text-xs">
            <User className="h-3 w-3 mr-1" />
            Profile
          </Button>
          <Button variant="outline" size="sm" className="w-full text-xs">
            <Bell className="h-3 w-3 mr-1" />
            Notifications
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileSummary;
