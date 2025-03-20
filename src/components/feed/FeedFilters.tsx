import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface FeedFiltersProps {
  activeFilter?: string;
  onFilterChange?: (filter: string) => void;
}

const FeedFilters = ({
  activeFilter = "all",
  onFilterChange = () => {},
}: FeedFiltersProps) => {
  return (
    <div className="w-full bg-background p-3 border-b flex items-center justify-between sticky top-0 z-10">
      <Tabs
        defaultValue={activeFilter}
        onValueChange={onFilterChange}
        className="w-full max-w-md"
      >
        <TabsList className="w-full">
          <TabsTrigger value="all" className="flex-1">
            All
          </TabsTrigger>
          <TabsTrigger value="dava" className="flex-1">
            Dava/Cases
          </TabsTrigger>
          <TabsTrigger value="haykir" className="flex-1">
            Haykır/Shout
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <Button variant="ghost" size="icon" className="ml-2">
        <Filter className="h-5 w-5" />
        <span className="sr-only">Additional filters</span>
      </Button>
    </div>
  );
};

export default FeedFilters;
