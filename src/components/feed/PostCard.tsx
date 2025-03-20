import React from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Share2, MoreHorizontal, ThumbsUp, ThumbsDown } from 'lucide-react';

interface PostCardProps {
  post?: {
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
  };
}

const PostCard: React.FC<PostCardProps> = ({ post = {
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
} }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  const getCategoryBadgeClass = (category: string) => {
    switch(category) {
      case 'dava':
        return 'bg-blue-100 text-blue-800';
      case 'haykir':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryLabel = (category: string) => {
    switch(category) {
      case 'dava':
        return 'Case';
      case 'haykir':
        return 'Shout';
      default:
        return 'Other';
    }
  };

  return (
    <Card className="w-full mb-4 bg-white overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarImage src={post.user.avatar} alt={post.user.name} />
              <AvatarFallback>{post.user.name.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{post.user.name}</div>
              <div className="text-sm text-gray-500">@{post.user.username} • {formatDate(post.createdAt)}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`text-xs px-2 py-1 rounded-full ${getCategoryBadgeClass(post.category)}`}>
              {getCategoryLabel(post.category)}
            </span>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
        <p className="text-gray-700 mb-4">{post.content}</p>
        {post.mediaUrl && (
          <div className="rounded-md overflow-hidden mb-4">
            <img 
              src={post.mediaUrl} 
              alt="Post media" 
              className="w-full h-auto object-cover max-h-96"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t pt-3 flex flex-col space-y-3">
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center space-x-1 text-gray-500 text-sm">
            <ThumbsUp className="h-4 w-4" />
            <ThumbsDown className="h-4 w-4" />
            <span>{post.stats.likes}</span>
          </div>
          <div className="flex space-x-2 text-sm text-gray-500">
            <span>{post.stats.comments} comments</span>
            <span>•</span>
            <span>{post.stats.shares} shares</span>
          </div>
        </div>
        <div className="flex justify-between w-full border-t pt-3">
          <Button variant="ghost" size="sm" className="flex-1 flex items-center justify-center">
            <Heart className="h-4 w-4 mr-2" />
            Like
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 flex items-center justify-center">
            <MessageCircle className="h-4 w-4 mr-2" />
            Comment
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 flex items-center justify-center">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
