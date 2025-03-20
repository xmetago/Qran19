import React, { useState } from 'react';
import FeedFilters from './FeedFilters';
import PostCard from './PostCard';
import CreatePostButton from './CreatePostButton';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Post {
  id: string;
  title: string;
  content: string;
  category: 'dava' | 'haykir' | 'other';
  createdAt: string;
  mediaUrl?: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
    username: string;
  };
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
}

interface FeedContainerProps {
  posts?: Post[];
  onCreatePost?: () => void;
}

const FeedContainer: React.FC<FeedContainerProps> = ({ 
  posts = [
    {
      id: '1',
      title: 'We need to address the environmental issues in our neighborhood',
      content: 'The local park has been neglected for months. There's trash everywhere and the playground equipment is broken. We need to organize a community cleanup and petition the city council for better maintenance.',
      category: 'dava',
      createdAt: '2023-06-15T10:30:00Z',
      mediaUrl: 'https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=800&q=80',
      user: {
        id: '101',
        name: 'Ayşe Yılmaz',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ayse',
        username: 'ayse_activist',
      },
      stats: {
        likes: 42,
        comments: 13,
        shares: 7,
      },
    },
    {
      id: '2',
      title: 'Education system needs immediate reform!',
      content: 'Students are struggling with outdated curriculum and teaching methods. We need to raise our voices and demand better education policies that prepare our youth for the future.',
      category: 'haykir',
      createdAt: '2023-06-14T15:45:00Z',
      user: {
        id: '102',
        name: 'Mehmet Kaya',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mehmet',
        username: 'mehmet_educator',
      },
      stats: {
        likes: 87,
        comments: 32,
        shares: 15,
      },
    },
    {
      id: '3',
      title: 'Public transportation accessibility case',
      content: 'Many neighborhoods in our city lack proper public transportation access. This is affecting job opportunities and quality of life for thousands of residents. Let's build a case for expanded bus routes.',
      category: 'dava',
      createdAt: '2023-06-13T09:15:00Z',
      mediaUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80',
      user: {
        id: '103',
        name: 'Zeynep Demir',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zeynep',
        username: 'zeynep_transit',
      },
      stats: {
        likes: 56,
        comments: 23,
        shares: 9,
      },
    }
  ],
  onCreatePost = () => {}
}) => {
  const [activeFilter, setActiveFilter] = useState('all');
  
  const filteredPosts = activeFilter === 'all' 
    ? posts 
    : posts.filter(post => post.category === activeFilter);

  return (
    <div className="w-full h-full flex flex-col bg-gray-50">
      <FeedFilters 
        activeFilter={activeFilter} 
        onFilterChange={setActiveFilter} 
      />
      
      <ScrollArea className="flex-1 px-4 py-2">
        <div className="max-w-3xl mx-auto">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">No posts found in this category.</p>
              <p className="text-sm text-gray-400 mt-2">Be the first to create a post!</p>
            </div>
          )}
          <div className="h-16"></div> {/* Space for floating button */}
        </div>
      </ScrollArea>
      
      <CreatePostButton onClick={onCreatePost} />
    </div>
  );
};

export default FeedContainer;
